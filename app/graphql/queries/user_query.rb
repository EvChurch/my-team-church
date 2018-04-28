# frozen_string_literal: true

module Queries::UserQuery
  Get = GraphQL::Field.define do
    type Types::UserType
    description 'Get Current User'
    resolve lambda { |_organization, _args, ctx|
      ctx[:current_user]
    }
  end
end
