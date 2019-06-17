# frozen_string_literal: true

module Queries::TeamQuery
  List = GraphQL::Field.define do
    type !types[Types::TeamType]
    argument :department_id, types.ID
    description 'List of Teams'
    before_scope
    resource lambda { |organization, args, ctx|
      if args[:department_id]
        organization.departments
                    .kept
                    .find(args[:department_id])
                    .teams
                    .kept
      else
        team_ids = ctx[:current_user].links
                                     .joins(person: :team_leaders)
                                     .where(team_leaders: { discarded_at: nil })
                                     .pluck('team_leaders.team_id')
        team_ids = organization.departments
                               .kept
                               .joins(:teams)
                               .where(teams: { id: team_ids })
                               .pluck('teams.id')
                               .uniq
        organization.teams.where(id: team_ids)
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
