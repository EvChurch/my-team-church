# frozen_string_literal: true

class User::Link < ApplicationRecord
  belongs_to :person
  belongs_to :organization
  belongs_to :user
  validates :user_id, uniqueness: { scope: :organization_id }
  before_validation :set_organization, if: :person_id_changed?
  after_create :add_permission

  protected

  def add_permission
    user.add_role(:member, organization)
  end

  def remove_permission
    user.remove_role(:member, organization)
  end

  def set_organization
    self.organization = person.organization
  end
end
