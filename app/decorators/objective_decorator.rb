# frozen_string_literal: true

class ObjectiveDecorator < ApplicationDecorator
  include ActionView::Helpers::NumberHelper

  def presentable_amount
    if objective.percentage?
      "#{objective.amount}%"
    elsif objective.money?
      number_to_currency(objective.amount)
    elsif objective.number?
      objective.amount
    end
  end
end
