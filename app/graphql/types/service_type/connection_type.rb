# frozen_string_literal: true

Types::ServiceType::ConnectionType = GraphQL::ObjectType.define do
    name 'ServiceTypeConnection'
    field :id, !types.ID
    field :service_type, Types::ServiceTypeType
end
