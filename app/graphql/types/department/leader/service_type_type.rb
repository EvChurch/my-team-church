# frozen_string_literal: true

Types::Department::Leader::ServiceTypeType = GraphQL::ObjectType.define do
  name 'LeaderServiceTypeType'
  field :id, !types.ID
  field :leader, Types::Department::LeaderType
  field :service_type, Types::ServiceTypeType
end
