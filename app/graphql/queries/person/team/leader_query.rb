# frozen_string_literal: true

module Queries::Person::Team::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::LeaderType]
    argument :person_id, !types.ID
    description 'List of team leader roles belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_leaders
                  .kept
                  .where(person_id: args[:person_id])
    }
    resolve lambda { |team_leaders, _args, _ctx|
      team_leaders.decorate
    }
  end
end
