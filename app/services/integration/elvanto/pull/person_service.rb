# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto::Pull::PersonService < Integration::Elvanto::Pull::BaseService
  ADDITIONAL_FIELDS =
    %w[gender birthday anniversary school_grade marital_status development_child special_needs_child
       security_code receipt_name giving_number mailing_address mailing_address2 mailing_city mailing_state
       mailing_postcode mailing_country home_address home_address2 home_city home_state home_postcode
       home_country departments family reports_to].freeze


  def pull
    people.each do |attributes|
      person = @organization.people.find_or_initialize_by(remote_id: attributes['id'], remote_source: 'Elvanto')
      attributes['family'] = attributes['family'] == [] ? {} : attributes['family']
      attributes['first_name'] = attributes.delete('firstname')
      attributes['last_name'] = attributes.delete('lastname')
      person.attributes = attributes.select { |k, _v| person.attributes.keys.member?(k.to_s) && k.to_s != 'id' }
      person.save
      person.access_permission_ids = remote_ids_to_ids(attributes, 'access_permission')
      person.demographic_ids = remote_ids_to_ids(attributes, 'demographic')
      person.location_ids = remote_ids_to_ids(attributes, 'location')
      next unless attributes['departments'] != []

      person.position_ids = attributes['departments']['department'].map do |a|
        a['sub_departments']['sub_department'].map do |b|
          remote_ids_to_ids(b, 'position')
        end
      end.flatten
    end
  end

  protected

  def remote_ids_to_ids(collection, name)
    plural_name = name.pluralize
    return [] if collection[plural_name] == []

    collection[plural_name][name].map do |object|
      name.classify.constantize.find_by!(
        remote_id: object['id'],
        remote_source: 'Elvanto',
        organization: organization
      ).id
    end
  end

  def people
    return @people if @people

    request = pull_people_from_api
    people = request['people']['person']
    return people unless request['people']['total'] > 1000

    pages = (request['people']['total'] + 500).round(-3) / 1000
    (2..pages).each do |page|
      request = pull_people_from_api(page)
      people += request['people']['person']
    end
    @people = people
  end

  def pull_people_from_api(page = 1)
    ElvantoAPI.configure(api_key: integration.api_key)
    ElvantoAPI.call('people/getAll', page_size: 1000, page: page, fields: ADDITIONAL_FIELDS)
  end
end
