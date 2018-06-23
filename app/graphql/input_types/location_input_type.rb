# frozen_string_literal: true

InputTypes::LocationInputType = GraphQL::InputObjectType.define do
  name 'LocationInputType'
  description 'Properties for creating a Location'

  argument :name, types.String do
    description 'Name of the Location.'
  end
end
