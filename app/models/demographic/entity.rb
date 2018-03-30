# frozen_string_literal: true

class Demographic::Entity < ApplicationRecord
  belongs_to :demographic, inverse_of: :entities
  belongs_to :person, inverse_of: :demographic_entities
end
