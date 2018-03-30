# frozen_string_literal: true

module Mutations::UserMutation
  Authenticate = GraphQL::Field.define do
    description 'Authenticate User'
    argument :user, !InputTypes::UserInputType
    type Types::UserType
    resolve lambda { |_obj, args, _ctx|
      user = User.find_for_authentication(email: args[:user][:email])
      return unless user
      user.valid_password?(args[:user][:password]) ? user.decorate : nil
    }
  end

  Create = GraphQL::Field.define do
    description 'Create User'
    argument :user, !InputTypes::UserInputType
    type Types::UserType
    resolve lambda { |_obj, args, _ctx|
      User.create!(args[:user].to_h)
          .decorate
    }
  end
end
