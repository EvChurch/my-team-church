# frozen_string_literal: true

module Mutations::TeamMutation
  Create = GraphQL::Field.define do
    description 'Create Team'
    argument :department_id, !types.ID
    argument :team, !InputTypes::TeamInputType
    type Types::Team::PositionType
    resolve lambda { |organization, args, _ctx|
      organization.departments
                  .find(args[:department_id])
                  .teams
                  .create!(args[:team].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Team'
    argument :id, !types.ID
    argument :team, !InputTypes::TeamInputType
    type Types::TeamType
    resolve lambda { |organization, args, _ctx|
      team = organization.teams
                         .kept
                         .find(args[:id])
      team.update!(args[:team].to_h)
      team.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete team'
    argument :id, !types.ID
    type Types::TeamType
    resolve lambda { |organization, args, _ctx|
      team = organization.teams
                         .kept
                         .find(args[:id])
      team.discard
      team.decorate
    }
  end
end
