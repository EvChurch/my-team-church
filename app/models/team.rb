# frozen_string_literal: true

class Team < ApplicationRecord
  include Pushable

  belongs_to :organization, required: true
  has_many :team_links, class_name: 'Team::Link', dependent: :destroy
  has_many :departments, through: :team_links
  has_many :positions, dependent: :destroy
  has_many :entities, through: :positions
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  validates :name, :departments, presence: true

  def positions_needing_people
    people_active = people_active_grouped_by_position_id
    people_needed_grouped_by_position_id.select do |key, value|
      value > (people_active[key] || 0)
    end.length
  end

  protected

  def people_needed_grouped_by_position_id
    positions.kept.group(:id).sum(:people_needed)
  end

  def people_active_grouped_by_position_id
    entities.active.group(:position_id).reorder(nil).count
  end
end
