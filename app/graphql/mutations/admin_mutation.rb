# frozen_string_literal: true

module Mutations::AdminMutation
  Create = GraphQL::Field.define do
    description 'Create Admin'
    argument :id, !types.ID
    type Types::UserType
    authorize :create
    resolve lambda { |organization, args, _ctx|
      user = User.find(args[:id])
      user.add_role(:admin, organization)
      user.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Admin'
    argument :id, !types.ID
    type Types::UserType
    authorize :destroy
    resolve lambda { |organization, args, _ctx|
      user = User.find(args[:id])
      user.remove_role(:admin, organization)
      user.decorate
    }
  end
end
