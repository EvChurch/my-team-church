# frozen_string_literal: true

class Team::Link < ApplicationRecord
  belongs_to :team, required: true
  belongs_to :department, required: true
end
