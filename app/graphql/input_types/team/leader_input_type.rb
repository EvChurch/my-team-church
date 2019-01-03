# frozen_string_literal: true

InputTypes::Team::LeaderInputType = GraphQL::InputObjectType.define do
  name 'TeamLeaderInputType'
  description 'Properties for a Team -> Person Relationship as a leader'

  argument :person_id, !types.ID do
    description 'ID of the Person.'
  end
end
