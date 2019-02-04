# frozen_string_literal: true

module Queries::Team::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::LeaderType]
    argument :team_id, !types.ID
    description 'List of people leading a team'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_leaders
                  .kept
                  .where(team_id: args[:team_id])
    }
    resolve lambda { |team_leaders, _args, _ctx|
      team_leaders.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Team::LeaderType
    argument :id, !types.ID
    description 'Get Leader by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.team_leaders
                  .kept
                  .find(args[:id])
    }
    resolve ->(team_leader, _args, _ctx) { team_leader.decorate }
  end
end
