# frozen_string_literal: true

class Objective::KeyResultDecorator < ApplicationDecorator
  def progress_percentage
    ((current_value - start_value) / (target_value - start_value)) * weight
  end
end
