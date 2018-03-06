# frozen_string_literal: true

Types::ObjectiveInputType = GraphQL::InputObjectType.define do
  name 'ObjectiveInputType'
  description 'Properties for creating an Objective'

  argument :name, !types.String do
    description 'Name of the Objective.'
  end

  argument :description, types.String do
    description 'Description of the Objective.'
  end
end
