# frozen_string_literal: true

module Mutations::LocationMutation
  Create = GraphQL::Field.define do
    description 'Create Location'
    argument :location, !InputTypes::LocationInputType
    type Types::LocationType
    resolve lambda { |organization, args, _ctx|
      organization.locations
                  .create!(args[:location].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Location'
    argument :id, !types.ID
    argument :location, !InputTypes::LocationInputType
    type Types::LocationType
    resolve lambda { |organization, args, _ctx|
      location = organization.locations
                             .find(args[:id])
      location.update!(args[:location].to_h)
      location.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Location'
    argument :id, !types.ID
    type Types::LocationType
    resolve lambda { |organization, args, _ctx|
      organization.locations
                  .find(args[:id])
                  .destroy
    }
  end
end
