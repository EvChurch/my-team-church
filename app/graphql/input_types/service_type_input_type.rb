# frozen_string_literal: true

InputTypes::ServiceTypeInputType = GraphQL::InputObjectType.define do
  name 'ServiceTypeInputType'
  description 'Properties for creating a ServiceType'

  argument :name, types.String do
    description 'Name of the ServiceType.'
  end
end
