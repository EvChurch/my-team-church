# frozen_string_literal: true

module Mutations::ServiceType::ConnectionMutation
  Create = GraphQL::Field.define do
    description 'Create ServiceTypeConnection'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :service_type_connection, !InputTypes::ServiceType::ConnectionInputType
    type Types::ServiceType::ConnectionType
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type])
                           .service_type_connections
                           .create!(args[:service_type_connection].to_h)
                           .decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete ServiceTypeConnection'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    type Types::ServiceType::ConnectionType
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type])
                           .service_type_connections
                           .find(args[:id])
                           .destroy!
    }
  end
end
