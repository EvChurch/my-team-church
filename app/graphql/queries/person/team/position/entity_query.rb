# frozen_string_literal: true

module Queries::Person::Team::Position::EntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::Position::EntityType]
    argument :person_id, !types.ID
    description 'List of Positions belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_position_entities
                  .kept
                  .where(person_id: args[:person_id])
    }
    resolve lambda { |entities, _args, _ctx|
      entities.decorate
    }
  end
end
