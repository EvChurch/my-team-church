# frozen_string_literal: true

FactoryBot.define do
  factory :objective_key_result, class: 'Objective::KeyResult' do
    objective nil
    result_type 'MyString'
    start_value '9.99'
    target_value '9.99'
    weight '9.99'
  end
end
