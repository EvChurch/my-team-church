# frozen_string_literal: true

class Team::Position < ApplicationRecord
  include Pushable
  include ActionView::Helpers

  belongs_to :team, optional: false
  has_many :entities, class_name: 'Team::Position::Entity', dependent: :destroy, inverse_of: :position
  has_many :people, through: :entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :items, class_name: 'Team::Position::Item', dependent: :destroy, inverse_of: :position
  validates :name, presence: true
  default_scope -> { order(:name) }
  has_many_attached :files
  delegate :organization, to: :team

  def description=(unsafe_description)
    super sanitize(unsafe_description)
  end

  def description
    return super if super.present?

    <<~HTML
      <div><strong>ROLE</strong></div><br>
      <div><strong>RESPONSIBILITIES</strong></div><ul><li></li></ul>
      <div><strong>REQUIREMENTS</strong></div><ul><li></li></ul>
      <div><strong>REPORTING STRUCTURE</strong></div><ol><li></li></ol>
    HTML
  end

  def training_description=(unsafe_training_description)
    super sanitize(unsafe_training_description)
  end

  def people_active
    entities.joins(:person).active.count
  end
end
