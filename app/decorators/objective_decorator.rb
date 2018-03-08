# frozen_string_literal: true

class ObjectiveDecorator < ApplicationDecorator
  decorates_association :key_results

  def percentage_complete
    key_results.map(&:progress_percentage).sum.fdiv(object.key_results.sum(:weight)) * 100
  end
end
