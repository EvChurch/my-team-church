# frozen_string_literal: true

module Queries::PersonQuery
  Get = GraphQL::Field.define do
    type Types::PersonType
    argument :id, !types.ID
    description 'Find a Person by ID'
    resolve lambda { |organization, args, _ctx|
      organization.people
                  .find(args[:id])
                  .decorate
    }
  end

  Me = GraphQL::Field.define do
    type Types::PersonType
    description 'Find Person associated with user'
    resolve lambda { |organization, _args, ctx|
      organization.user_links
                  .find_by!(user: ctx[:current_user])
                  .person
                  .decorate
    }
  end
end
