# frozen_string_literal: true

module Mutations::Position::EntityMutation
  Create = GraphQL::Field.define do
    description 'Create PositionEntity'
    argument :position_id, !types.ID
    argument :position_entity, !InputTypes::Position::EntityInputType
    type Types::Position::EntityType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .includes(:entities)
                        .find(args[:position_id])
                        .entities
                        .create!(args[:position_entity].to_h)
                        .decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete PositionEntity'
    argument :position_id, !types.ID
    argument :id, !types.ID
    type Types::DepartmentType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .includes(:entities)
                        .find(args[:position_id])
                        .entities
                        .find(args[:id])
                        .destroy
    }
  end
end
