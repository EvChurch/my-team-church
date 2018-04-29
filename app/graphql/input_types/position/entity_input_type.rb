# frozen_string_literal: true

InputTypes::Position::EntityInputType = GraphQL::InputObjectType.define do
  name 'PositionEntityInputType'
  description 'Properties for creating a Position -> Person Relationship'

  argument :person_id, !types.ID do
    description 'ID of the Person.'
  end
end
