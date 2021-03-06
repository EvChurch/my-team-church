# frozen_string_literal: true

module Queries::Team::PositionQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::PositionType]
    argument :team_id, !types.ID
    description 'List of Positions'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_positions
                  .kept
                  .where(team_id: args[:team_id])
    }
    resolve ->(positions, _args, _ctx) { positions.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::Team::PositionType
    argument :id, !types.ID
    description 'Get Position by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.team_positions
                  .kept
                  .find(args[:id])
    }
    resolve ->(position, _args, _ctx) { position.decorate }
  end
end
