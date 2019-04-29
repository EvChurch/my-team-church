# frozen_string_literal: true

class ObjectiveDecorator < ApplicationDecorator
  decorates_association :key_results

  def percentage_complete
    key_results = object.key_results.kept.map { |key_result| key_result.decorate.progress_percentage }
    key_results.sum.fdiv(object.key_results.kept.sum(:weight)) * 100
  end
end
