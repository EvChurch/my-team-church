# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto::Push::PersonService < Integration::Elvanto::Push::BaseService
  def create
    update
  end

  def update
    create_person unless record.remote_id
    update_person
  end

  protected

  def create_person
    response = elvanto.post('people/create', firstname: record.first_name, lastname: record.last_name)
    record.update(remote_id: response.body.dig('person', 'id'), remote_source: 'elvanto', pushable: false)
  end

  def update_person
    elvanto.post('people/edit', person)
  end

  def person
    {
      id: record.remote_id,
      firstname: record.first_name,
      lastname: record.last_name,
      email: record.email,
      phone: record.phone,
      mobile: record.mobile,
      volunteer: record.positions.present? ? 'yes' : 'no',
      fields: {
        gender: record.gender,
        departments_replace: record.positions.map(&method(:position_to_elvanto_department_field))
      }
    }
  end

  def position_to_elvanto_department_field(position)
    "#{position.team.departments.first.breadcrumb}||#{position.team.name}||#{position.name}"
  end

  def elvanto
    ElvantoAPI.configure(api_key: integration.api_key)
    ElvantoAPI
  end
end
