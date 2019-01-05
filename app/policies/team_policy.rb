# frozen_string_literal: true

class TeamPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(id: team_ids)
    end

    def team_ids
      (team_ids_by_team_leaders + team_ids_by_department_leaders).uniq
    end

    def team_ids_by_department_leaders
      @team_ids_by_department_leaders ||= Department.where(id: department_and_children_ids)
                                                    .joins(:teams)
                                                    .pluck('teams.id')
    end

    def team_ids_by_team_leaders
      @team_ids_by_team_leaders ||= user.links
                                        .joins(person: :team_leaders)
                                        .where(team_leaders: { discarded_at: nil })
                                        .pluck('team_leaders.team_id')
    end

    def person_ids
      @person_ids ||= user.links.pluck(:person_id)
    end
  end
end
