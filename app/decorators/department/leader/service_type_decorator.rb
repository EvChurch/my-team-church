# frozen_string_literal: true

class Department::Leader::ServiceTypeDecorator < ApplicationDecorator
    decorates_association :leader
    decorates_association :service_type
  end
