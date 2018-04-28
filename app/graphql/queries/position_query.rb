# frozen_string_literal: true

module Queries::PositionQuery
  List = GraphQL::Field.define do
    type !types[Types::PositionType]
    argument :department_id, !types.ID
    description 'List of Positions'
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .where(department_id: args[:department_id])
                  .decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::PositionType
    argument :department_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .where(department_id: args[:department_id])
                  .find(args[:id])
                  .decorate
    }
  end
end
