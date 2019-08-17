# frozen_string_literal: true

class Integration::Elvanto::PushJob < ApplicationJob
  attr_accessor :integration, :model, :action
  queue_as :default

  def perform(integration, model, action)
    return unless integration.active

    @integration = integration
    @model = model
    @action = action
    "Integration::Elvanto::Push::#{model.class}Service".constantize.push(@integration, @model, @action)
  end
end
