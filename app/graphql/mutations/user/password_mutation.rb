# frozen_string_literal: true

module Mutations::User::PasswordMutation
  Forgot = GraphQL::Field.define do
    description 'User forgot their password'
    argument :user_password_forgot, !InputTypes::User::Password::ForgotInputType
    type !types.Boolean
    resolve lambda { |_organization, args, _ctx|
      user = User.find_by(email: args[:user_password_forgot][:email])
      return false unless user

      user.send_reset_password_instructions
      true
    }
  end

  Reset = GraphQL::Field.define do
    description 'User is resetting their password'
    argument :user_password_reset, !InputTypes::User::Password::ResetInputType
    type !types.Boolean
    resolve lambda { |_organization, args, _ctx|
      user = User.with_reset_password_token(args[:user_password_reset][:reset_password_token])
      return false if !user

      user.reset_password(args[:user_password_reset][:password], args[:user_password_reset][:password])
      true
    }
  end

  Update = GraphQL::Field.define do
    description 'User is updating their password'
    argument :user_password, !InputTypes::User::PasswordInputType
    type !types.Boolean
    resolve lambda { |_organization, args, ctx|
      ctx[:current_user].update_with_password(args[:user_password].to_h.transform_keys(&:to_sym))
    }
  end
end
