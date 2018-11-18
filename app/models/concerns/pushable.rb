# frozen_string_literal: true

module Pushable
  extend ActiveSupport::Concern

  included do
    after_commit :push_create_to_integrations, on: :create
    after_commit :push_update_to_integrations, on: :update
    after_commit :push_destroy_to_integrations, on: :destroy
  end

  protected

  def push_create_to_integrations
    organization.run_integration_push_job(self, 'create')
  end

  def push_update_to_integrations
    organization.run_integration_push_job(self, 'update')
  end

  def push_destroy_to_integrations
    organization.run_integration_push_job(self, 'destroy')
  end
end
