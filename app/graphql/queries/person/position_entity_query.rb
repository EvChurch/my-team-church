# frozen_string_literal: true

module Queries::Person::PositionEntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Position::EntityType]
    argument :person_id, !types.ID
    description 'List of Positions belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.position_entities.where(person_id: args[:person_id])
    }
    resolve lambda { |entities, _args, _ctx|
      entities.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Position::EntityType
    argument :person_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID belonging to a person'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.position_entities.where(person_id: args[:person_id]).find(args[:id])
    }
    resolve ->(entity, _args, _ctx) { entity.decorate }
  end
end
