# frozen_string_literal: true

InputTypes::Position::EntityInputType = GraphQL::InputObjectType.define do
  name 'PositionEntityInputType'
  description 'Properties for creating a Position -> Person Relationship'

  argument :person_id, !types.ID do
    description 'Description of the position.'
  end
end
