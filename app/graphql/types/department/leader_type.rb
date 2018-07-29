# frozen_string_literal: true

Types::Department::LeaderType = GraphQL::ObjectType.define do
  name 'DepartmentLeader'
  field :id, !types.ID
  field :department, Types::DepartmentType
  field :person, Types::PersonType
  field :service_type_connections, types[Types::ServiceType::ConnectionType]
end
