# frozen_string_literal: true

class User::Option < ApplicationRecord
  belongs_to :user, inverse_of: :options
  validates :user, presence: true
  validates :key, presence: true, uniqueness: { scope: :user_id }
end
