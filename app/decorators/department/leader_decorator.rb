# frozen_string_literal: true

class Department::LeaderDecorator < ApplicationDecorator
  decorates_association :person
  decorates_association :department
end
