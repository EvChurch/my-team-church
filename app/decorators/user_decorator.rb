class UserDecorator < ApplicationDecorator
  def name
    "#{first_name} #{last_name}".strip
  end

  def initials
    name.split.map { |w| w[0] }.join.upcase
  end
end
