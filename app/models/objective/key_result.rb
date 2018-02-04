# frozen_string_literal: true

class Objective::KeyResult < ApplicationRecord
  belongs_to :objective
  validates :name, :result_type, :start_value, :target_value, :weight, presence: true
end
