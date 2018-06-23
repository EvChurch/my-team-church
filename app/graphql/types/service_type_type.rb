# frozen_string_literal: true

Types::ServiceTypeType = GraphQL::ObjectType.define do
  name 'ServiceType'
  field :id, !types.ID
  field :name, !types.String
end
