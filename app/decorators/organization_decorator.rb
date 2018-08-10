# frozen_string_literal: true

class OrganizationDecorator < ApplicationDecorator
  decorates_association :teams
  decorates_association :department_imports
end
