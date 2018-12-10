# frozen_string_literal: true

InputTypes::PositionInputType = GraphQL::InputObjectType.define do
  name 'DepartmentInputType'
  description 'Properties for creating a Team'

  argument :name, types.String do
    description 'Name of the Team.'
  end

  argument :description, types.String do
    description 'Description of the Team.'
  end
end
