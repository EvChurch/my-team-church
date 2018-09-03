# frozen_string_literal: true

module Mutations::Position::EntityMutation
  Create = GraphQL::Field.define do
    description 'Create PositionEntity'
    argument :position_id, !types.ID
    argument :position_entity, !InputTypes::Position::EntityInputType
    type Types::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .includes(:entities)
                  .find(args[:position_id])
                  .entities
                  .create!(args[:position_entity].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update PositionEntity'
    argument :position_id, !types.ID
    argument :id, !types.ID
    argument :position_entity, !InputTypes::Position::EntityInputType
    type Types::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      position_entity = organization.positions
                                    .find(args[:position_id])
                                    .entities
                                    .find(args[:id])
      position_entity.update!(args[:position_entity].to_h)
      position_entity.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete PositionEntity'
    argument :position_id, !types.ID
    argument :id, !types.ID
    type Types::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .includes(:entities)
                  .find(args[:position_id])
                  .entities
                  .find(args[:id])
                  .destroy
    }
  end

  DeleteByPerson = GraphQL::Field.define do
    description 'Delete PositionEntity by person'
    argument :person_id, !types.ID
    argument :id, !types.ID
    type Types::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      organization.people
                  .includes(:position_entities)
                  .find(args[:person_id])
                  .position_entities
                  .find(args[:id])
                  .destroy
    }
  end
end
