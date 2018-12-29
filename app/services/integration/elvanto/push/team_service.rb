# frozen_string_literal: true

class Integration::Elvanto::Push::TeamService
  def self.push(integration, team, _action)
    team.departments.each do |department|
      Integration::Elvanto::Push::DepartmentService.push(integration, department, 'update')
    end
  end
end
