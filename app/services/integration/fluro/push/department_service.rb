# frozen_string_literal: true

class Integration::Fluro::Push::DepartmentService
  attr_accessor :integration, :department, :action

  def self.push(integration, department, action)
    new(integration, department, action).send(action)
  end

  def initialize(integration, department, action)
    @integration = integration
    @department = department
    @action = action
  end

  def create
    response = create_realm
    department.update(remote_id: response['_id'], remote_source: 'fluro', pushable: false)
  end

  def update
    department.remote_id ? update_realm : create
  end

  def discard
    destroy_realm
  end

  protected

  def create_realm
    HTTParty.post(
      'https://api.fluro.io/content/realm',
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      },
      body: department_params
    )
  end

  def update_realm
    HTTParty.put(
      "https://api.fluro.io/content/realm/#{department.remote_id}",
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      },
      body: department_params
    )
  end

  def department_params
    department_params = {
      title: department.name,
      status: 'active'
    }
    department_params[:trail] = [department.parent&.remote_id] if department.parent&.remote_id
    department_params
  end

  def destroy_realm
    HTTParty.delete(
      "https://api.fluro.io/content/realm/#{department.remote_id}",
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      }
    )
  end
end
