# frozen_string_literal: true

class Integration::Elvanto::Push::PersonService < Integration::Elvanto::Push::BaseService
  def create
    response = ElvantoAPI.post('people/create', elvanto_person_object)
    record.update(remote_id: response.body.dig('person', 'id'), remote_source: 'elvanto', pushable: false)
  end

  def update
    update_person
    update_account
  end

  protected

  def update_person
    response = post("admin/people/person/?id=#{record.remote_id}", person, 'form')
    alert_text = Nokogiri::HTML(response).at('.ajax-alerts .message p').text
    return if alert_text == 'Person has been saved successfully!'

    raise 'person failed to sync'
  end

  def person
    {
      member_firstname: record.first_name,
      member_lastname: record.last_name,
      member_email: record.email,
      member_phone: record.phone,
      member_mobile: record.mobile,
      member_gender: record.gender_as_letter,
      save: 1
    }
  end

  def update_account
    response = post("admin/people/person_account/?id=#{record.remote_id}", account, 'form')
    alert_text = Nokogiri::HTML(response).at('.ajax-alerts .message p').text
    return if alert_text == 'Account Details have been saved successfully!'

    raise 'person account failed to sync'
  end

  def account
    {
      department_positions: record.positions.where(remote_source: 'elvanto').pluck(:remote_id),
      save: 'account'
    }
  end
end
