# frozen_string_literal: true

class User::LinkDecorator < ApplicationDecorator
  decorates_association :user
  decorates_association :person
  decorates_association :organization
end
