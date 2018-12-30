# frozen_string_literal: true

module Queries::AdminQuery
  List = GraphQL::Field.define do
    type !types[Types::UserType]
    description 'List of Admins'
    before_scope
    resource lambda { |organization, _args, _ctx|
      User.with_role(:admin, organization)
    }
    resolve lambda { |users, _args, _ctx|
      users.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::UserType
    argument :id, !types.ID
    description 'Get Admin by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      User.with_role(:admin, organization)
          .find(args[:id])
    }
    resolve ->(user, _args, _ctx) { user.decorate }
  end
end
