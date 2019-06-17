# frozen_string_literal: true

module Queries::Person::Team::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::LeaderType]
    argument :person_id, !types.ID
    description 'List of team leader roles belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      ids = organization.departments
                        .kept
                        .joins(teams: [:leaders])
                        .where(teams: { discarded_at: nil },
                               team_leaders: { discarded_at: nil, person_id: args[:person_id] })
                        .pluck('team_leaders.id')
      organization.team_leaders.where(id: ids)
    }
    resolve lambda { |team_leaders, _args, _ctx|
      team_leaders.decorate
    }
  end
end
