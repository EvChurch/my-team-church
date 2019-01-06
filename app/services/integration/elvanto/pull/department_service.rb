# frozen_string_literal: true

class Integration::Elvanto::Pull::DepartmentService < Integration::Elvanto::Pull::BaseService
  LOCAL_COLLECTION = COLLECTION = 'departments'

  protected

  def import_record(department)
    local_department = organization.departments.find_or_initialize_by(
      remote_id: department['id'], remote_source: 'elvanto'
    )
    local_department.name = department['name']
    local_department.pushable = false
    local_department.save!
    department['sub_departments']&.each do |team|
      import_team(team, local_department)
    end
    local_department
  end

  def import_team(team, local_department)
    local_team = organization.teams.find_or_initialize_by(
      remote_id: team['id'], remote_source: 'elvanto'
    )
    local_team.name = team['name']
    local_team.departments << local_department unless local_team.departments.include?(local_department)
    local_team.pushable = false
    local_team.save!
    team['positions'].each do |position|
      import_position(position, local_team)
    end
  end

  def import_position(position, local_team)
    local_position = local_team.positions.find_or_initialize_by(
      remote_id: position['id'], remote_source: 'elvanto'
    )
    local_position.name = position['name']
    local_position.pushable = false
    local_position.save!
    local_position
  end
end
