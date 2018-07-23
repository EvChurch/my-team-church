class Department::Leader::ServiceType < ApplicationRecord
  belongs_to :leader
  belongs_to :service_type, class_name: '::ServiceType'
end
