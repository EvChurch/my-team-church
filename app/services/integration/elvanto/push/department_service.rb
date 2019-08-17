# frozen_string_literal: true

class Integration::Elvanto::Push::DepartmentService < Integration::Elvanto::Push::BaseService
  def create
    update_local(post_department_to_elvanto) unless record.positions.kept.empty?
  end

  def update
    create
  end

  def discard
    return unless record.remote_id.present? && record.remote_source == 'elvanto'

    post(
      'admin/settings/departments',
      action: 'delete',
      department_id: record.remote_id
    )
  end

  protected

  def post_department_to_elvanto
    post_department(
      record.remote_id || 'add',
      name: record.breadcrumb,
      self_assign: false,
      has_sub_departments: '',
      status: '',
      notification: true,
      sub_departments: record.teams.kept.map(&method(:team)).compact
    )
  end

  def post_department(id, body)
    post("admin/settings/departments/#{id}", body.merge(id: id))
  end

  def team(local_team)
    return if local_team.positions.kept.empty?

    {
      id: local_team.remote_id || 'add',
      name: local_team.name,
      parent_id: record.remote_id,
      self_assign: false,
      positions: local_team.positions.kept.map(&method(:position))
    }
  end

  def position(local_position)
    {
      id: local_position.remote_id || 'add',
      name: local_position.name,
      self_assign: false,
      leadership_position: false
    }
  end

  def update_local(response)
    return if response['errors']

    record.update(remote_id: response['id'], remote_source: 'elvanto', pushable: false)
    response['sub_departments'].each do |team|
      local_team = record.teams.find_by(remote_id: team['id'], remote_source: 'elvanto')
      unless local_team
        local_team = record.teams.find_by(remote_id: nil, remote_source: nil, name: team['name'])
        local_team.update(remote_id: team['id'], remote_source: 'elvanto', pushable: false)
      end
      team['positions'].each do |position|
        local_position = local_team.positions.find_by(remote_id: position['id'], remote_source: 'elvanto')
        unless local_position
          local_position = local_team.positions.find_by(remote_id: nil, remote_source: nil, name: position['name'])
          local_position.update(remote_id: position['id'], remote_source: 'elvanto', pushable: false)
        end
      end
    end
  end
end
