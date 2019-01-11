# frozen_string_literal: true

module Mutations::PersonMutation
  Create = GraphQL::Field.define do
    description 'Create Person'
    argument :person, !InputTypes::PersonInputType
    type Types::PersonType
    resolve lambda { |organization, args, _ctx|
      organization.people
                  .create!(args[:person].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Person'
    argument :id, !types.ID
    argument :person, !InputTypes::PersonInputType
    type Types::PersonType
    resolve lambda { |organization, args, _ctx|
      person = organization.people
                           .kept
                           .find(args[:id])
      person.update!(args[:person].to_h)
      person.decorate
    }
  end

  Invite = GraphQL::Field.define do
    description 'Invite Person'
    argument :id, !types.ID
    type Types::PersonType
    resolve lambda { |organization, args, ctx|
      person = organization.people
                           .kept
                           .find(args[:id])
      person.invite(ctx[:current_user])
      person.decorate
    }
  end
end
