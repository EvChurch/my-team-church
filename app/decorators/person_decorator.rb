# frozen_string_literal: true

class PersonDecorator < ApplicationDecorator
  decorates_association :position_entities
  decorates_association :users

  def name
    "#{first_name} #{last_name}".strip
  end

  def initials
    name.split.map { |w| w[0] }.join.upcase
  end
end
