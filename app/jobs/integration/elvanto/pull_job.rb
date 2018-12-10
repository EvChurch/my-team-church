# frozen_string_literal: true

class Integration::Elvanto::PullJob < ApplicationJob
  queue_as :default

  CLASSES_TO_PULL = %w[
    Integration::Elvanto::Pull::DepartmentService
    Integration::Elvanto::Pull::PersonService
  ].freeze

  def perform(integration)
    CLASSES_TO_PULL.each { |klass| klass.constantize.pull(integration) }
    integration.update(pushable: true)
  end
end
