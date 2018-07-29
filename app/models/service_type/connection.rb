class ServiceType::Connection < ApplicationRecord
  belongs_to :resource, polymorphic: true
  belongs_to :service_type
end
