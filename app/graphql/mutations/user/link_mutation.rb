# frozen_string_literal: true

module Mutations::User::LinkMutation
  Create = GraphQL::Field.define do
    description 'Create UserLink'
    argument :person_id, !types.ID
    type Types::User::LinkType
    resolve lambda { |_organization, args, ctx|
      ctx[:current_user].links
                        .create!(person_id: args[:person_id])
                        .decorate
    }
  end
end
