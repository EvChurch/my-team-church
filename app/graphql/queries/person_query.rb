# frozen_string_literal: true

module Queries::PersonQuery
  List = Types::PersonType.connection_type do
    argument :search_string, types.String
    description 'List of People'
    resolve lambda { |organization, args, _ctx|
      people = organization.people
      if args[:search_string].present?
        people = people.where("concat_ws(' ', email, first_name, last_name) ILIKE ?", "%#{args[:search_string]}%")
      end
      people.decorate
    }
  end

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
