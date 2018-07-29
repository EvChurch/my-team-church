# frozen_string_literal: true

InputTypes::ServiceType::ConnectionInputType = GraphQL::InputObjectType.define do
  name 'ServiceTypeConnectionInputType'
  description 'Properties for a Leader -> ServiceType relationship'

  argument :service_type_id, !types.ID do
    description 'ID of the Service Type.'
  end
end
