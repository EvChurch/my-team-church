# frozen_string_literal: true

FactoryBot.define do
  factory :user_link, class: 'User::Link' do
    person nil
    user nil
  end
end
