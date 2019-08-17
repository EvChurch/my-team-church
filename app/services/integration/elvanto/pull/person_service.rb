# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto::Pull::PersonService < Integration::Elvanto::Pull::BaseService
  ADDITIONAL_FIELDS =
    %w[gender birthday anniversary school_grade marital_status development_child special_needs_child
       security_code receipt_name giving_number mailing_address mailing_address2 mailing_city mailing_state
       mailing_postcode mailing_country home_address home_address2 home_city home_state home_postcode
       home_country departments family reports_to].freeze

  def pull
    people.each do |attributes|
      local_person = @organization.people.find_by(remote_id: attributes['id'], remote_source: 'elvanto')
      local_person ||= @organization.people.find_by(email: attributes['email'], remote_id: nil, remote_source: nil)
      local_person ||= @organization.people.build

      local_person.attributes = format_attributes(attributes)
      local_person.pushable = false
      local_person.save

      setup_position_entities(local_person, attributes)
    end
  end

  protected

  def people
    return @people if @people

    request = pull_people_from_api
    people = request['people']['person']
    return people unless request['people']['total'] > 1000

    pages = (request['people']['total'] + 500).round(-3) / 1000
    (2..pages).each do |page|
      request = pull_people_from_api(page)
      people += request['people']['person']
    end
    @people = people
  end

  def format_attributes(attributes)
    attributes['first_name'] = attributes.delete('firstname')
    attributes['last_name'] = attributes.delete('lastname')
    attributes['remote_id'] = attributes.delete('id')
    attributes['remote_source'] = 'elvanto'
    attributes['discarded_at'] = (attributes['contact'] == 1 || attributes['archived'] == 1 ? Time.current : nil)
    attributes.select { |k, _v| Person.column_names.member?(k.to_s) }
  end

  def setup_position_entities(person, attributes)
    return person.position_entities.discard_all if attributes['departments'] == []

    position_ids = position_ids(attributes)
    set_discarded_at_on_person_position_entities(person, position_ids)
    create_missing_person_position_entities(person, position_ids)
  end

  def set_discarded_at_on_person_position_entities(person, position_ids)
    person.position_entities.where.not(position_id: position_ids).discard_all
    person.position_entities.where(position_id: position_ids).undiscard_all
  end

  def create_missing_person_position_entities(person, position_ids)
    missing_position_ids = position_ids - person.position_ids
    return if missing_position_ids.empty?

    missing_position_ids.each do |position_id|
      person.position_ids << position_id
    rescue ActiveRecord::RecordNotUnique => e
      Rails.logger.error [e.message, *e.backtrace].join($INPUT_RECORD_SEPARATOR)
    end
  end

  def position_ids(attributes)
    organization.team_positions.where(remote_id: remote_position_ids(attributes), remote_source: 'elvanto').ids
  end

  def remote_position_ids(attributes)
    attributes['departments']['department'].map do |department|
      department['sub_departments']['sub_department'].map do |sub_department|
        sub_department['positions']['position'].map { |object| object['id'] }
      end
    end.flatten
  end

  def pull_people_from_api(page = 1)
    ElvantoAPI.configure(api_key: integration.api_key)
    ElvantoAPI.call('people/getAll', page_size: 1000, page: page, fields: ADDITIONAL_FIELDS)
  end
end
