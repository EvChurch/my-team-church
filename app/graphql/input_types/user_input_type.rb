# frozen_string_literal: true

InputTypes::UserInputType = GraphQL::InputObjectType.define do
  name 'UserInputType'
  description 'Properties for creating a User'

  argument :first_name, types.String do
    description 'First Name of the User.'
  end

  argument :last_name, types.String do
    description 'Last Name of the User.'
  end

  argument :password, !types.String do
    description 'Password of the User.'
  end

  argument :email, !types.String do
    description 'Email Address of the User.'
  end
end
