# frozen_string_literal: true

class Demographic
  class Entity < ApplicationRecord
    belongs_to :demographic
    belongs_to :resource, polymorphic: true
  end
end
