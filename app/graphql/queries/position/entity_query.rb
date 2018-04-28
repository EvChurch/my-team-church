# frozen_string_literal: true

module Queries::Position::EntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Position::EntityType]
    argument :position_id, !types.ID
    description 'List of Positions'
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .find(args[:position_id])
                  .entities
                  .includes(:person)
                  .decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Position::EntityType
    argument :position_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .includes(:entities)
                  .find(args[:position_id])
                  .entities
                  .includes(:person)
                  .find(args[:id])
                  .decorate
    }
  end
end
