class Integration::Elvanto::DepartmentPushService
  attr_accessor :integration, :department, :action, :cookies

  def self.push(integration, person, action)
    new(integration, person, action).send(action)
  end

  def initialize(integration, department, action)
    @integration = integration
    @department = department
    @action = action
    @cookies = Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end

  def create
    return unless department.positions.exists?

    response = post_to_elvanto
    department.update(remote_id: response['id'], remote_source: 'elvanto')
    department.positions.each_with_index do |position, index|
      position.update(remote_id: response['positions'][index]['id'], remote_source: 'elvanto')
    end
  end

  def update
    return unless department.positions.exists?

    post_to_elvanto
  end

  protected

  def post_to_elvanto
    department_form = Nokogiri::HTML(
      HTTParty.get(
        "https://myteamatchurch.elvanto.com.au/admin/settings/departments/#{department.remote_id || 'add'}",
        headers: { 'Cookie' => cookies.to_cookie_string }
      )
    )
    csrf_token = JSON.parse(
      department_form.at('script:contains("csrf_token")').text.delete_prefix('var PageData = ').delete_suffix(';')
    )['view']['csrf_token']
    HTTParty.post(
      "https://myteamatchurch.elvanto.com.au/admin/settings/departments/#{department.remote_id || 'add'}",
      headers: {
        'Cookie' => cookies.to_cookie_string,
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
      },
      body: {
        id: department.remote_id,
        name: department.path.map(&:name).join(' > '),
        self_assign: false,
        has_sub_departments: '',
        reports_to: [],
        status: '',
        notification: true,
        non_conflicts: [],
        sub_departments: [],
        positions: department.positions.map do |position|
          {
            id: position.remote_id || position.id,
            name: position.name,
            self_assign: false,
            leadership_position: false,
            reports_to: [],
            non_conflicts: []
          }
        end,
        csrf_token: csrf_token
      }.to_json
    )
  end
end
