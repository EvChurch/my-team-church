require 'elvanto'

class Integration
  class Elvanto
    class GetAllJob < ApplicationJob
      queue_as :default

      ADDITIONAL_FIELDS =
        %w[gender birthday anniversary school_grade marital_status development_child special_needs_child
           security_code receipt_name giving_number mailing_address mailing_address2 mailing_city mailing_state
           mailing_postcode mailing_country home_address home_address2 home_city home_state home_postcode
           home_country access_permissions departments service_types demographics locations family reports_to].freeze

      ELVANTO_MODELS_TO_SYNC = %w[
        AccessPermission Demographic Location ServiceType
        Department Department::SubDepartment Department::SubDepartment::Position
      ].freeze

      def perform(integration)
        @integration = integration
        @organization = integration.organization
        ElvantoAPI.configure(api_key: @integration.api_key)
        # sync_models
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
        klass = elvanto_model_name.split('::').last.constantize
        names = elvanto_model_name.underscore.split('/')
        collection = people
        names.each_with_index do |name, index|
          plural_name = name.pluralize
          collection = collection.map do |object|
            container_object = object[plural_name] == [] ? [] : object[plural_name][name]
            if container_object.empty?
              container_object
            else
              container_object.map do |parent_object|
                unless names[index + 1].nil?
                  parent_object[names[index + 1].pluralize][names[index + 1]].map do |child_object|
                    child_object["#{name}_id"] = parent_object['name']
                  end
                end
                parent_object
              end
            end
          end.flatten
        end
        collection.flatten.uniq { |object| object['id'] }.each do |object|
          container_object = klass.where(remote_id: object['id'],
                                         remote_source: 'Elvanto',
                                         organization: @organization).first_or_initialize
          object.delete('id')
          object.each do |k, v|
            next unless k.ends_with?('_id')
            object[k] = k.remove('_id').classify.constantize.find_by!(
              name: v,
              remote_source: 'Elvanto',
              organization: @organization).id
          end
          container_object.attributes = object.select { |k, _v| container_object.attributes.keys.member?(k.to_s) }
          container_object.save!
          container_object
        end
      end

      def sync_people
        people.each do |attributes|
          person = @organization.people.find_or_initialize_by(remote_id: attributes['id'], remote_source: 'Elvanto')
          attributes.delete('id')
          attributes['family'] = attributes['family'] == [] ? {} : attributes['family']
          person.attributes = attributes.select { |k, _v| person.attributes.keys.member?(k.to_s) }
          person.save
          person.access_permission_ids = remote_ids_to_ids(attributes, 'access_permission')
          person.demographic_ids = remote_ids_to_ids(attributes, 'demographic')
          person.location_ids = remote_ids_to_ids(attributes, 'location')
          person.service_type_ids = remote_ids_to_ids(attributes, 'service_type')
          next unless attributes['departments'] != []
          attributes['departments']['department'].map do |a|
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
          name.classify.constantize.find_by(
            remote_id: object['id'],
            remote_source: 'Elvanto',
            organization: @organization
          ).id
        end
      end
    end
  end
end
