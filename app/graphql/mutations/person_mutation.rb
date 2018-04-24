# frozen_string_literal: true

module Mutations::PersonMutation
  Create = GraphQL::Field.define do
    description 'Create Person'
    argument :person, !InputTypes::PersonInputType
    type Types::PersonType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].people
                        .create!(args[:person].to_h)
                        .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Person'
    argument :id, !types.ID
    argument :person, !InputTypes::PersonInputType
    type Types::PersonType
    resolve lambda { |_obj, args, ctx|
      person = ctx[:organization].people.find(args[:id])
      person.update_attributes!(args[:person].to_h)
      person.decorate
    }
  end
end
