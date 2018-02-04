# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto::SyncJob < ApplicationJob
  queue_as :default

  ADDITIONAL_FIELDS =
    %w[gender birthday anniversary school_grade marital_status development_child special_needs_child
       security_code receipt_name giving_number mailing_address mailing_address2 mailing_city mailing_state
       mailing_postcode mailing_country home_address home_address2 home_city home_state home_postcode
       home_country access_permissions departments service_types demographics locations family reports_to].freeze

  ELVANTO_MODELS_TO_SYNC = %w[
    AccessPermission Demographic Location ServiceType
  ].freeze

  def perform(integration)
    @integration = integration
    @organization = integration.organization
    ElvantoAPI.configure(api_key: @integration.api_key)
    sync_models
    sync_positions
    sync_people
  end

  protected

  def sync_models
    ELVANTO_MODELS_TO_SYNC.each { |elvanto_model_name| create_objects(elvanto_model_name) }
  end

  def people
    return @people if @people
    request = fetch_people
    people = request['people']['person']
    return people unless request['people']['total'] > 1000
    pages = (request['people']['total'] + 500).round(-3) / 1000
    (2..pages).each do |page|
      request = fetch_people(page)
      people += request['people']['person']
    end
    @people = people
  end

  def fetch_people(page = 1)
    ElvantoAPI.call('people/getAll', page_size: 1000, page: page, fields: ADDITIONAL_FIELDS)
  end

  def create_objects(elvanto_model_name)
    klass = elvanto_model_name.constantize
    name = elvanto_model_name.underscore
    plural_name = name.pluralize
    collection = people.map { |person| person[plural_name] == [] ? [] : person[plural_name][name] }
    collection.flatten.uniq { |object| object['id'] }.each do |object|
      container_object = klass.where(
        remote_id: object['id'],
        remote_source: 'Elvanto',
        organization: @organization
      ).first_or_initialize
      container_object.attributes =
        object.select { |k, _v| container_object.attributes.keys.member?(k.to_s) && k.to_s != 'id' }
      container_object.save!
    end
  end

  def sync_positions
    collection = {}
    people.each do |person|
      departments = person['departments'] == [] ? [] : person['departments']['department']
      departments.each do |department|
        sub_departments = department['sub_departments'] == [] ? [] : department['sub_departments']['sub_department']
        sub_departments.each do |sub_department|
          positions = sub_department['positions'] == [] ? [] : sub_department['positions']['position']
          positions.each do |position|
            collection[department['id']] ||=
              { name: department['name'], sub_departments: {} }
            collection[department['id']][:sub_departments][sub_department['id']] ||=
              { name: sub_department['name'], positions: {} }
            collection[department['id']][:sub_departments][sub_department['id']][:positions][position['id']] ||=
              { name: position['name'] }
          end
        end
      end
    end
    collection.each do |department_id, department_object|
      department =
        @organization.departments.create_with(
          name: department_object[:name]
        ).find_or_create_by(
          remote_id: department_id,
          remote_source: 'Elvanto'
        )
      department_object[:sub_departments].each do |sub_department_id, sub_department_object|
        sub_department =
          @organization.departments.create_with(
            name: sub_department_object[:name],
            parent: department
          ).find_or_create_by(
            remote_id: sub_department_id,
            remote_source: 'Elvanto'
          )
        sub_department_object[:positions].each do |position_id, position_object|
          @organization.positions.create_with(
            name: position_object[:name]
          ).find_or_create_by(
            department_id: sub_department.id,
            remote_id: position_id,
            remote_source: 'Elvanto'
          )
        end
      end
    end
  end

  def sync_people
    people.each do |attributes|
      person = @organization.people.find_or_initialize_by(remote_id: attributes['id'], remote_source: 'Elvanto')
      attributes['family'] = attributes['family'] == [] ? {} : attributes['family']
      person.attributes = attributes.select { |k, _v| person.attributes.keys.member?(k.to_s) && k.to_s != 'id' }
      person.save
      person.access_permission_ids = remote_ids_to_ids(attributes, 'access_permission')
      person.demographic_ids = remote_ids_to_ids(attributes, 'demographic')
      person.location_ids = remote_ids_to_ids(attributes, 'location')
      person.service_type_ids = remote_ids_to_ids(attributes, 'service_type')
      next unless attributes['departments'] != []
      person.position_ids = attributes['departments']['department'].map do |a|
        a['sub_departments']['sub_department'].map do |b|
          remote_ids_to_ids(b, 'position')
        end
      end.flatten
    end
  end

  def remote_ids_to_ids(collection, name)
    plural_name = name.pluralize
    return [] if collection[plural_name] == []
    collection[plural_name][name].map do |object|
      name.classify.constantize.find_by!(
        remote_id: object['id'],
        remote_source: 'Elvanto',
        organization: @organization
      ).id
    end
  end
end
