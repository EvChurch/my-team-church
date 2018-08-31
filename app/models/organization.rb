# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :integrations, dependent: :destroy
  has_many :access_permissions, dependent: :destroy
  has_many :demographics, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :department_leaders, class_name: 'Department::Leader', through: :departments, source: :leaders
  has_many :locations, dependent: :destroy
  has_many :people, dependent: :destroy
  has_many :positions, dependent: :destroy
  has_many :position_entities, through: :positions, source: :entities
  has_many :service_types, dependent: :destroy
  has_many :service_type_connections, through: :service_types, source: :connections
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :user_links, class_name: 'User::Link', dependent: :destroy, inverse_of: :organization
  has_many :users, through: :user_links

  accepts_nested_attributes_for :integrations

  resourcify
  validates :name, :address_1, :city, :state, :zip, :country, :time_zone, presence: true
end
