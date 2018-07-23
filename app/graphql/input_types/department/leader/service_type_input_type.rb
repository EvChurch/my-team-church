# frozen_string_literal: true

InputTypes::Department::Leader::ServiceTypeInputType = GraphQL::InputObjectType.define do
  name 'DepartmentLeaderServiceTypeInputType'
  description 'Properties for a Leader -> ServiceType relationship'

  argument :service_type_id, !types.ID do
    description 'ID of the Service Type.'
  end
end
