# frozen_string_literal: true

class Integration::Elvanto::Push::DepartmentService
  attr_accessor :integration, :department, :action

  def self.push(integration, person, action)
    new(integration, person, action).send(action)
  end

  def initialize(integration, department, action)
    @integration = integration
    @department = department
    @action = action
  end

  def create
    return unless department.positions.exists?

    response = post_department_to_elvanto
    department.update(remote_id: response['id'], remote_source: 'elvanto')
    department.positions.each_with_index do |position, index|
      position.update(remote_id: response['positions'][index]['id'], remote_source: 'elvanto')
    end
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
      reports_to: [],
      status: '',
      notification: true,
      non_conflicts: [],
      sub_departments: [],
      positions: positions
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

  def positions
    department.positions.map do |position|
      {
        id: position.remote_id || 'add',
        name: position.name,
        self_assign: false,
        leadership_position: false,
        reports_to: [],
        non_conflicts: []
      }
    end
  end

  def cookies
    @cookies ||= Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end
end
