# frozen_string_literal: true

InputTypes::User::Password::ForgotInputType = GraphQL::InputObjectType.define do
  name 'UserPasswordForgotInputType'
  description 'Properties for initiating password recovery'

  argument :email, !types.String do
    description 'Email Address of the User.'
  end
end
