# frozen_string_literal: true

InputTypes::PositionInputType = GraphQL::InputObjectType.define do
  name 'PositionInputType'
  description 'Properties for creating a Position'

  argument :name, types.String do
    description 'Name of the Position.'
  end

  argument :description, types.String do
    description 'Description of the position.'
  end

  argument :department_id, types.ID do
    description 'ID of the parent Department.'
  end
end
