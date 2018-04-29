# frozen_string_literal: true

module Queries::Position::EntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Position::EntityType]
    argument :position_id, !types.ID
    description 'List of PositionEntities'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.position_entities.where(position_id: args[:position_id])
    }
    resolve lambda { |entities, _args, _ctx|
      entities.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Position::EntityType
    argument :position_id, !types.ID
    argument :id, !types.ID
    description 'Get PositionEntity by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.position_entities.where(position_id: args[:position_id]).find(args[:id])
    }
    resolve ->(entity, _args, _ctx) { entity.decorate }
  end
end
