# frozen_string_literal: true

module Queries::LocationQuery
    List = GraphQL::Field.define do
      type !types[Types::LocationType]
      description 'List of Locations'
      before_scope
      resource lambda { |organization, args, _ctx|
        organization.locations
      }
      resolve ->(locations, _args, _ctx) { locations.decorate }
    end
  
    Get = GraphQL::Field.define do
      type Types::LocationType
      argument :id, !types.ID
      description 'Get Location by ID'
      authorize :show
      resource lambda { |organization, args, _ctx|
        organization.locations.find(args[:id])
      }
      resolve ->(location, _args, _ctx) { location.decorate }
    end
  end
  