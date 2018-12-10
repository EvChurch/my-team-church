# frozen_string_literal: true

module Queries::Team::Position::EntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::Position::EntityType]
    argument :team_id, !types.ID
    argument :position_id, !types.ID
    description 'List of Entities'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_position_entities
                  .kept
                  .where(team_positions: { id: args[:position_id] }, teams: { id: args[:team_id] })
                  .includes(:person)
    }
    resolve lambda { |entities, _args, _ctx|
      entities.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Team::Position::EntityType
    argument :id, !types.ID
    description 'Get Entity by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.team_position_entities
                  .kept
                  .find(args[:id])
    }
    resolve ->(entity, _args, _ctx) { entity.decorate }
  end
end
