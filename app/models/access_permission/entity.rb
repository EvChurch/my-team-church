# frozen_string_literal: true

class AccessPermission::Entity < ApplicationRecord
  belongs_to :access_permission
  belongs_to :resource, polymorphic: true
end
