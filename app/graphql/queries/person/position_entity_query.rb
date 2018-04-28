# frozen_string_literal: true

module Queries::Person::PositionEntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Position::EntityType]
    argument :person_id, !types.ID
    description 'List of Positions belonging to a person'
    resolve lambda { |organization, args, _ctx|
      organization.people
                  .find(args[:person_id])
                  .position_entities
                  .includes(:position)
                  .decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Position::EntityType
    argument :person_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID belonging to a person'
    resolve lambda { |organization, args, _ctx|
      organization.people
                  .find(args[:person_id])
                  .position_entities
                  .includes(position: :department)
                  .find(args[:id])
                  .decorate
    }
  end
end
