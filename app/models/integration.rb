# frozen_string_literal: true

class Integration < ApplicationRecord
  TYPES = %w[Integration::Elvanto].freeze

  belongs_to :organization, inverse_of: :integrations
  after_commit :run_integration_sync_jobs, on: :create
  validates :type, inclusion: { in: Integration::TYPES }

  protected

  def run_integration_sync_jobs
    "#{self.class.name}::SyncJob".constantize.perform_later(self)
  end
end
