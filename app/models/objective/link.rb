# frozen_string_literal: true

class Objective::Link < ApplicationRecord
  belongs_to :parent, class_name: 'Objective', inverse_of: :child_links
  belongs_to :child, class_name: 'Objective', inverse_of: :parent_links
  validates :child_id, uniqueness: { scope: :parent_id }
  validate :cannot_link_self

  protected

  def cannot_link_self
    errors.add(:child_id, 'You cannot link objective to itself.') if child_id == parent_id
  end
end
