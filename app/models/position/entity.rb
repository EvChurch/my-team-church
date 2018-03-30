# frozen_string_literal: true

class Position::Entity < ApplicationRecord
  belongs_to :position, inverse_of: :entities
  belongs_to :person, inverse_of: :position_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
end
