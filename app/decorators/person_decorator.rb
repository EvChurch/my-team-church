# frozen_string_literal: true

class PersonDecorator < ApplicationDecorator
  def name
    "#{firstname} #{lastname}".strip
  end

  def initials
    name.split.map { |w| w[0] }.join.upcase
  end
end
