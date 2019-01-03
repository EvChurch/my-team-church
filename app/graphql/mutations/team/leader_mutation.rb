# frozen_string_literal: true

module Mutations::Team::LeaderMutation
  Create = GraphQL::Field.define do
    description 'Create Leader'
    argument :team_id, !types.ID
    argument :leader, !InputTypes::Team::LeaderInputType
    type Types::Team::LeaderType
    resolve lambda { |organization, args, _ctx|
      scope = organization.teams.find(args[:team_id]).leaders
      leader = scope.find_by(args[:leader].to_h)
      leader ||= scope.create!(args[:leader].to_h)
      leader.undiscard
      leader.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Leader'
    argument :id, !types.ID
    type Types::Team::LeaderType
    resolve lambda { |organization, args, _ctx|
      leader = organization.team_leaders
                           .kept
                           .find(args[:id])
      leader.discard
      leader.decorate
    }
  end
end
