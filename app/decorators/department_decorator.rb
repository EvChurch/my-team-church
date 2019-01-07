# frozen_string_literal: true

class DepartmentDecorator < ApplicationDecorator
  decorates_association :positions
  decorates_association :objectives
  decorates_association :children
end
