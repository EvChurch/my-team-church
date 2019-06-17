# frozen_string_literal: true

module Queries::Person::Team::Position::EntityQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::Position::EntityType]
    argument :person_id, !types.ID
    description 'List of Positions belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      ids = organization.departments
                        .kept
                        .joins(teams: { positions: [:entities] })
                        .where(teams: { discarded_at: nil },
                               team_positions: { discarded_at: nil },
                               team_position_entities: { discarded_at: nil, person_id: args[:person_id] })
                        .pluck('team_position_entities.id')
      organization.team_position_entities.where(id: ids)
    }
    resolve lambda { |entities, _args, _ctx|
      entities.decorate
    }
  end
end
