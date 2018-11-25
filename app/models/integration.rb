# frozen_string_literal: true

class Integration < ApplicationRecord
  TYPES = %w[Integration::Elvanto].freeze

  attr_encrypted :api_key, key: [ENV.fetch('INTEGRATION_API_KEY_ENC')].pack("H*")
  attr_encrypted :password, key: [ENV.fetch('INTEGRATION_PASSWORD_ENC')].pack("H*")
  belongs_to :organization, inverse_of: :integrations
  after_commit :run_integration_pull_job, on: :create
  validates :type, inclusion: { in: Integration::TYPES }
  scope :pushable, -> { where(pushable: true) }

  def run_integration_push_job(model, action)
    "#{self.class.name}::PushJob".constantize.perform_later(self, model, action)
  end

  def run_integration_pull_job
    "#{self.class.name}::PullJob".constantize.perform_later(self)
  end

  def active
    false
  end
end
