# frozen_string_literal: true

module Queries::TeamQuery
  List = GraphQL::Field.define do
    type !types[Types::TeamType]
    argument :department_id, types.ID
    description 'List of Teams'
    before_scope
    resource lambda { |organization, args, _ctx|
      if args[:department_id]
        organization.departments
                    .kept
                    .find(args[:department_id])
                    .teams
      else
        organization.teams
                    .kept
      end
    }
    resolve ->(teams, _args, _ctx) { teams.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::TeamType
    argument :id, !types.ID
    description 'Get Team by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.teams
                  .kept
                  .find(args[:id])
    }
    resolve ->(team, _args, _ctx) { team.decorate }
  end
end
