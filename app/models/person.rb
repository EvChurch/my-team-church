# frozen_string_literal: true

class Person < ApplicationRecord
  include Pushable

  belongs_to :organization
  has_many :position_entities,
           -> { where(discarded_at: nil) },
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
  has_many :team_leaders,
           class_name: 'Team::Leader',
           dependent: :destroy,
           inverse_of: :person

  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  default_scope -> { order(:first_name, :last_name) }

  def gender_as_letter
    gender&.first&.downcase
  end

  def invitable
    email && (invited_at.blank? || invited_at < 5.minutes.ago) && users.empty?
  end

  def invite(user)
    return unless invitable

    update(invited_at: Time.current)
    PersonMailer.invite(user, self).deliver_later
  end
end
