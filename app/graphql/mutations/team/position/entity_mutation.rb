# frozen_string_literal: true

module Mutations::Team::Position::EntityMutation
  Create = GraphQL::Field.define do
    description 'Create Entity'
    argument :position_id, !types.ID
    argument :entity, !InputTypes::Team::Position::EntityInputType
    type Types::Team::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      scope = organization.team_positions
                          .find(args[:position_id])
                          .entities
      entity = scope.find_by(person_id: args[:entity][:person_id])
      entity ||= scope.build
      entity.attributes = args[:entity].to_h
      entity.save!
      entity.undiscard
      entity.decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Entity'
    argument :id, !types.ID
    argument :entity, !InputTypes::Team::Position::EntityInputType
    type Types::Team::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      entity = organization.team_position_entities
                           .kept
                           .find(args[:id])
      entity.update!(args[:entity].to_h)
      entity.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Entity'
    argument :id, !types.ID
    type Types::Team::Position::EntityType
    resolve lambda { |organization, args, _ctx|
      entity = organization.team_position_entities
                           .kept
                           .find(args[:id])
      entity.discard
      entity.decorate
    }
  end
end
