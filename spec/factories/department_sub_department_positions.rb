# frozen_string_literal: true

FactoryBot.define do
  factory :department_sub_department_position, class: 'Department::SubDepartment::Position' do
    id ''
    name 'MyString'
    sub_department_id ''
  end
end
