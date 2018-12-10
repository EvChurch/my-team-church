# frozen_string_literal: true

InputTypes::Team::Position::EntityInputType = GraphQL::InputObjectType.define do
  name 'TeamPositionEntityInputType'
  description 'Properties for creating a Position -> Person Relationship'

  argument :person_id, types.ID do
    description 'ID of the Person.'
  end

  argument :trial, types.Boolean do
    description 'Assignment is a trial.'
  end

  argument :start_at, Types::DateTimeType do
    description 'Start Timestamp when person serving in role should begin.'
  end

  argument :end_at, Types::DateTimeType do
    description 'End Timestamp when person serving in role should end.'
  end
end
