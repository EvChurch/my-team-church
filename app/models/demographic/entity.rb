# frozen_string_literal: true

class Demographic::Entity < ApplicationRecord
  belongs_to :demographic, inverse_of: :demographics
  belongs_to :resource, polymorphic: true
end
