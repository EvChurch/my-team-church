# frozen_string_literal: true

class Integration < ApplicationRecord
  belongs_to :organization, inverse_of: :integrations
end
