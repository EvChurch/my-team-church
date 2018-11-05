# frozen_string_literal: true

module Queries::OrganizationQuery
  List = GraphQL::Field.define do
    type !types[Types::OrganizationType]
    description 'List of Organizations'
    resolve lambda { |_organization, _args, ctx|
      OrganizationPolicy::Scope.new(ctx[:current_user], Organization)
                               .resolve
                               .decorate(context: { user: ctx[:current_user] })
    }
  end

  Get = GraphQL::Field.define do
    type Types::OrganizationType
    argument :id, !types.ID
    description 'Find a Organization by ID'
    resolve lambda { |_organization, args, ctx|
      Organization.with_role(:member, ctx[:current_user])
                  .find(args[:id])
                  .decorate(context: { user: ctx[:current_user] })
    }
  end
end
