# frozen_string_literal: true

class Integration::Elvanto::Push::DepartmentService
  attr_accessor :integration, :department, :action

  def self.push(integration, department, action)
    new(integration, department.root, action).send(action)
  end

  def initialize(integration, department, action)
    @integration = integration
    @department = department
    @action = action
  end

  def create
    update_local(post_department_to_elvanto) unless department.positions.empty?
  end

  def update
    create
  end

  protected

  def post_department_to_elvanto
    post_department(
      department.remote_id || 'add',
      name: department.path.map(&:name).join(' > '),
      self_assign: false,
      has_sub_departments: '',
      status: '',
      notification: true,
      sub_departments: department.teams.map(&method(:team)).compact
    )
  end

  def post_department(id, body)
    url = "https://#{integration.domain}/admin/settings/departments/#{id}"
    HTTParty.post(
      url,
      headers: {
        'Cookie' => cookies,
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
      },
      body: body.merge(id: id, csrf_token: csrf_token(url)).to_json
    )
  end

  def csrf_token(url)
    response = Nokogiri::HTML(HTTParty.get(url, headers: { 'Cookie' => cookies }))
    JSON.parse(
      response.at('script:contains("PageData")').text.delete_prefix('var PageData = ').delete_suffix(';')
    )['view']['csrf_token']
  end

  def team(local_team)
    {
      id: local_team.remote_id || 'add',
      name: local_team.name,
      parent_id: department.remote_id,
      self_assign: false,
      positions: local_team.positions.map(&method(:position))
    } unless local_team.positions.empty?
  end

  def position(local_position)
    {
      id: local_position.remote_id || 'add',
      name: local_position.name,
      self_assign: false,
      leadership_position: false
    }
  end

  def cookies
    @cookies ||= Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end

  def update_local(response)
    return if response['errors']
    department.update(remote_id: response['id'], remote_source: 'elvanto', pushable: false)
    response['sub_departments'].each do |team|
      local_team = department.teams.find_by(remote_id: team['id'], remote_source: 'elvanto')
      unless local_team
        local_team = department.teams.find_by(remote_id: nil, remote_source: nil, name: team['name'])
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
