# frozen_string_literal: true

InputTypes::User::PasswordInputType = GraphQL::InputObjectType.define do
  name 'UserPasswordInputType'
  description 'Properties for resetting a User'

  argument :current_password, !types.String do
    description 'Current Password of the User.'
  end

  argument :password, !types.String do
    description 'New Password of the User.'
  end
end
