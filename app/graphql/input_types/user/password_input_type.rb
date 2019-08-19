# frozen_string_literal: true

InputTypes::User::PasswordInputType = GraphQL::InputObjectType.define do
  name 'UserPasswordInputType'
  description 'Properties for resetting a User'

  argument :password, !types.String do
    description 'New Password of the User.'
  end

  argument :password_confirmation, !types.String do
    description 'New Password of the User.'
  end
end
