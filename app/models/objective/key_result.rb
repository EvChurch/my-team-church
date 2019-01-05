# frozen_string_literal: true

class Objective::KeyResult < ApplicationRecord
  belongs_to :objective, inverse_of: :key_results
  validates :name, :result_type, :start_value, :target_value, :weight, presence: true
  enum kind: { key_result: 'key_result', initiative: 'initiative' }
  default_scope { order('LOWER(name)') }
end
