# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto::Push::PersonService
  attr_accessor :integration, :person, :action

  def self.push(integration, person, action)
    new(integration, person, action).send(action)
  end

  def initialize(integration, person, action)
    @integration = integration
    @person = person
    @action = action
    ElvantoAPI.configure(api_key: @integration.api_key)
  end

  def create
    response = ElvantoAPI.post('people/create', elvanto_person_object)
    person.update(remote_id: response.body.dig('person', 'id'), remote_source: 'Elvanto')
  end

  def update
    ElvantoAPI.post(
      'people/edit', elvanto_person_object
    )
  end

  protected

  def elvanto_person_object
    {
      id: person.remote_id,
      firstname: person.first_name,
      lastname: person.last_name,
      email: person.email,
      phone: person.phone,
      mobile: person.mobile,
      fields: {
        gender: person.gender,
        departments_replace: person.positions.map(&method(:position_to_elvanto_department_field))
      }
    }
  end

  def position_to_elvanto_department_field(position)
    root_department = position.department.path[0]
    sub_department = position.department.path[1]
    root_department.name
    {
      'department' => [{
        'id' => root_department.remote_id || root_department.id,
        'name' => root_department.name,
        'sub_departments' => {
          'sub_department' => [{
            'id' => sub_department.remote_id || sub_department.id,
            'name' => sub_department.name,
            'positions' => {
              'position' => [{
                'id' => position.remote_id || id,
                'name' => position.name
              }]
            }
          }]
        }
      }]
    }
  end
end
