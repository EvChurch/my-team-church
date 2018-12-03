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
    move_realm(response['_id'], department.parent&.remote_id) if department.parent&.remote_id
  end

  def update
    if department.remote_id
      update_realm
      move_realm(department.remote_id, department.parent&.remote_id) if department.parent&.remote_id
    else
      create
    end
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
      body: {
        title: department.name,
        status: 'active'
      }
    )
  end

  def update_realm
    HTTParty.put(
      "https://api.fluro.io/content/realm/#{department.remote_id}",
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      },
      body: {
        title: department.name,
        status: 'active'
      }
    )
  end

  def destroy_realm
    HTTParty.delete(
      "https://api.fluro.io/content/realm/#{department.remote_id}",
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      }
    )
  end

  def move_realm(realm_id, parent_id)
    HTTParty.put(
      'https://api.fluro.io/realm/move',
      headers: {
        'Authorization' => "Bearer #{integration.api_key}"
      },
      body: {
        parent: parent_id,
        realm: realm_id
      }
    )
  end
end
