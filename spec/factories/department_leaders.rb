# frozen_string_literal: true

FactoryBot.define do
  factory :department_leader, class: 'Department::Leader' do
    person nil
    department nil
  end
end
