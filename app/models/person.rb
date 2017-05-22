class Person < ApplicationRecord
  has_many :access_permission_entities,
           class_name: 'AccessPermission::Entity',
           as: :resource,
           dependent: :destroy
  has_many :access_permissions, through: :access_permission_entities
  has_many :demographic_entities,
           class_name: 'Demographic::Entity',
           as: :resource,
           dependent: :destroy
  has_many :demographics, through: :demographic_entities
  has_many :location_entities,
           class_name: 'Location::Entity',
           as: :resource,
           dependent: :destroy
  has_many :locations, through: :location_entities, as: :resource
  has_many :position_entities,
           class_name: 'Department::SubDepartment::Position::Entity',
           as: :resource,
           dependent: :destroy
  has_many :positions, through: :position_entities, class_name: 'Department::SubDepartment::Position'
  has_many :sub_departments,
           through: :positions,
           class_name: 'Department::SubDepartment'
  has_many :departments,
           through: :sub_departments,
           class_name: 'Department'
  has_many :service_type_entities,
           class_name: 'ServiceType::Entity',
           as: :resource,
           dependent: :destroy
  has_many :service_types, through: :service_type_entities
  default_scope -> { order(:firstname, :lastname) }
  serialize :family, Hash

  def self.create_collection_from_api(people)
    people.map do |attributes|
      person = find_or_initialize_by(id: attributes['id'])
      attributes['family'] = attributes['family'] == [] ? {} : attributes['family']
      person.attributes = attributes.select { |k, _v| person.attributes.keys.member?(k.to_s) }
      person.save
      person.access_permission_ids = attributes['access_permissions'] == [] ? [] : attributes['access_permissions']['access_permission'].map { |a| a['id'] }
      person.demographic_ids = attributes['demographics'] == [] ? [] : attributes['demographics']['demographic'].map { |a| a['id'] }
      person.location_ids = attributes['locations'] == [] ? [] : attributes['locations']['location'].map { |a| a['id'] }
      person.service_type_ids = attributes['service_types'] == [] ? [] : attributes['service_types']['service_type'].map { |a| a['id'] }
      person.position_ids = attributes['departments'] == [] ? [] : attributes['departments']['department'].map do |a|
        a['sub_departments']['sub_department'].map do |b|
          b['positions']['position'].map do |c|
            c['id']
          end
        end
      end.flatten
      person
    end
  end
end
