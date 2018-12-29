# frozen_string_literal: true

class Person < ApplicationRecord
  include Pushable

  belongs_to :organization
  has_many :position_entities,
           class_name: 'Team::Position::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :positions,
           class_name: 'Team::Position',
           through: :position_entities
  has_many :departments,
           through: :positions
  has_many :user_links,
           class_name: 'User::Link',
           dependent: :destroy,
           inverse_of: :person
  has_many :users,
           through: :user_links
  has_many :department_leaders,
           class_name: 'Department::Leader',
           dependent: :destroy,
           inverse_of: :person

  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  default_scope -> { order(:first_name, :last_name) }
  serialize :family, Hash
end
