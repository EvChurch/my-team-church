# frozen_string_literal: true

class Department < ApplicationRecord
  include Pushable

  has_ancestry
  belongs_to :organization
  has_many :positions, dependent: :destroy, inverse_of: :department
  has_many :leaders, dependent: :destroy, inverse_of: :department
  has_many :entities, through: :positions
  has_many :people, -> { uniq }, through: :positions
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  validates :name, presence: true
  default_scope { order('LOWER(departments.name)') }
  scope :with_leader, (lambda do |user|
    organization_ids = pluck(:organization_id).uniq
    admin = Organization.where(id: organization_ids).with_role(:admin, user).count == organization_ids.length
    return roots if admin
    department_ids = user.links.joins(person: :department_leaders).pluck('department_leaders.department_id')
    where(id: department_ids)
  end)

  def people_needed_grouped_by_position_id
    positions.group(:id).sum(:people_needed)
  end

  def people_active_grouped_by_position_id
    entities.active.group(:position_id).reorder(nil).count
  end

  def positions_needing_people
    people_active = people_active_grouped_by_position_id
    people_needed_grouped_by_position_id.select do |key, value|
      value > (people_active[key] || 0)
    end.length
  end
end
