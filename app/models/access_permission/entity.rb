# frozen_string_literal: true

class AccessPermission::Entity < ApplicationRecord
  belongs_to :access_permission, inverse_of: :entities
  belongs_to :person, inverse_of: :access_permission_entities
end
