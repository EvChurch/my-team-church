# frozen_string_literal: true

class DepartmentDecorator < ApplicationDecorator
  decorates_association :positions
  decorates_association :objectives
  decorates_association :children

  def breadcrumb
    ancestors.map(&:name).push(name).join(' > ')
  end
end
