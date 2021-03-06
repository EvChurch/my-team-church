# frozen_string_literal: true

class Department < ApplicationRecord
  include Pushable

  has_ancestry
  belongs_to :organization

  has_many :team_links, class_name: 'Team::Link', dependent: :destroy, inverse_of: :department
  has_many :teams, -> { kept }, through: :team_links
  has_many :positions, through: :teams, class_name: 'Team::Position'
  has_many :leaders, -> { kept }, dependent: :destroy, inverse_of: :department
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

  after_discard :discard_descendants

  def positions_needing_people
    people_active = people_active_grouped_by_position_id
    people_needed_grouped_by_position_id.select do |key, value|
      value > (people_active[key] || 0)
    end.length
  end

  def children
    super.kept
  end

  def breadcrumb
    path.map(&:name).join(' > ')
  end

  protected

  def people_needed_grouped_by_position_id
    positions.kept.group(:id).sum(:people_needed)
  end

  def people_active_grouped_by_position_id
    entities.active.group(:position_id).reorder(nil).count
  end

  def discard_descendants
    descendants.each(&:discard)
  end
end
