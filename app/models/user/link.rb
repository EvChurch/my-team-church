# frozen_string_literal: true

class User::Link < ApplicationRecord
  belongs_to :person
  belongs_to :organization
  belongs_to :user
  validates :user_id, uniqueness: { scope: :organization_id }
  before_validation :set_organization, if: :person_id_changed?

  protected

  def set_organization
    self.organization = person.organization
  end
end
