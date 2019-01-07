# frozen_string_literal: true

FactoryBot.define do
  factory :team_link, class: 'Team::Link' do
    team nil
    department nil
  end
end
