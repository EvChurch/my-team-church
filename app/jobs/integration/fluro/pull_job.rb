# frozen_string_literal: true

class Integration::Fluro::PullJob < ApplicationJob
  queue_as :default

  CLASSES_TO_PULL = %w[
    Integration::Fluro::Pull::DepartmentService
  ].freeze

  def perform(integration)
    CLASSES_TO_PULL.each { |klass| klass.constantize.pull(integration) }
    integration.update(pushable: true)
  end
end

# Integration::Elvanto::Pull::LocationService
# Integration::Elvanto::Pull::DemographicService
# Integration::Elvanto::Pull::AccessPermissionService
# Integration::Elvanto::Pull::PersonService