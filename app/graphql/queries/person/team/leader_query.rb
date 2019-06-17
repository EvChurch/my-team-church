# frozen_string_literal: true

module Queries::Person::Team::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::LeaderType]
    argument :person_id, !types.ID
    description 'List of team leader roles belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      team_ids = organization.departments
                             .kept
                             .joins(teams: [:leaders])
                             .merge(Team.kept)
                             .merge(Team::Leader.kept)
                             .where(team_leaders: { person_id: args[:person_id] })
                             .pluck('team_leaders.id')
      organization.team_leaders.where(id: team_ids)
    }
    resolve lambda { |team_leaders, _args, _ctx|
      team_leaders.decorate
    }
  end
end
