# frozen_string_literal: true

class Integration < ApplicationRecord
  belongs_to :organization, inverse_of: :integrations
  after_commit :run_integration_sync_jobs, on: :create

  protected

  def run_integration_sync_jobs
    "#{self.class.name}::SyncJob".constantize.perform_later(self)
  end
end
