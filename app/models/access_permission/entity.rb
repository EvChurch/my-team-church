class AccessPermission
  class Entity < ApplicationRecord
    belongs_to :access_permission
    belongs_to :resource, polymorphic: true
  end
end
