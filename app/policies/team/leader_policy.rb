# frozen_string_literal: true

class Team::LeaderPolicy < ApplicationPolicy
  class Scope < TeamPolicy::Scope
    protected

    def secure_scope
      scope.where(team_id: team_ids)
    end

    def organization_ids
      @organization_ids ||=
        scope.joins(:team, :person).pluck('teams.organization_id', 'people.organization_id').flatten.uniq
    end
  end
end
