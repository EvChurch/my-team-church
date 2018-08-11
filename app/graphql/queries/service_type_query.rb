# frozen_string_literal: true

module Queries::ServiceTypeQuery
  List = GraphQL::Field.define do
    type !types[Types::ServiceTypeType]
    description 'List of ServiceTypes'
    before_scope
    resource lambda { |organization, _args, _ctx|
      organization.service_types
    }
    resolve ->(service_types, _args, _ctx) { service_types.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::ServiceTypeType
    argument :id, !types.ID
    description 'Get ServiceType by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.service_types.find(args[:id])
    }
    resolve ->(service_type, _args, _ctx) { service_type.decorate }
  end
end
