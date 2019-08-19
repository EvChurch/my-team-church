# frozen_string_literal: true

InputTypes::User::Password::ResetInputType = GraphQL::InputObjectType.define do
  name 'UserPasswordResetInputType'
  description 'Properties for resetting a User'

  argument :password, !types.String do
    description 'New Password of the User.'
  end

  argument :password_confirmation, !types.String do
    description 'New Password of the User.'
  end

  argument :reset_password_token, !types.String do
    description 'Reset Password Token from email sent to User.'
  end
end
