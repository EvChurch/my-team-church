# frozen_string_literal: true

module Queries::ServiceType::ConnectionQuery
    List = GraphQL::Field.define do
      type !types[Types::ServiceType::ConnectionType]
      argument :resource_id, !types.ID
      argument :resource_type, !types.String
      description 'List of ServiceTypeConnections'
      resolve lambda { |organization, args, _ctx|
        ResourceFinderService.find(organization, args[:resource_id], args[:resource_type], [:service_type_connections])
                             .service_type_connections
                             .decorate
      }
    end

    Get = GraphQL::Field.define do
      type Types::ServiceType::ConnectionType
      argument :resource_id, !types.ID
      argument :resource_type, !types.String
      argument :id, !types.ID
      description 'ServiceTypeConnection'
      resolve lambda { |organization, args, _ctx|
        ResourceFinderService.find(organization, args[:resource_id], args[:resource_type], [:service_type_connections])
                             .service_type_connections
                             .find(args[:id])
                             .decorate
      }
    end
  end
