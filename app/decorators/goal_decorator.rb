class GoalDecorator < ApplicationDecorator
  include ActionView::Helpers::NumberHelper

  def presentable_amount
    if goal.percentage?
      "#{goal.amount}%"
    elsif goal.money?
      number_to_currency(goal.amount)
    elsif goal.number?
      goal.amount
    end
  end
end
