class Objective
  class KeyResult < ApplicationRecord
    belongs_to :objective
    validates :name, :result_type, :start_value, :target_value, :weight, presence: true
  end
end
