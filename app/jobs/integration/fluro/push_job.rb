# frozen_string_literal: true

class Integration::Fluro::PushJob < ApplicationJob
  attr_accessor :integration, :model, :action
  queue_as :default

  def perform(integration, model, action)
    return unless integration.active
    @integration = integration
    @model = model
    @action = action
    "Integration::Fluro::Push::#{model.class}Service".constantize.push(@integration, @model, @action)
  end
end
