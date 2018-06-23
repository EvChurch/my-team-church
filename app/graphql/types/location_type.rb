# frozen_string_literal: true

Types::LocationType = GraphQL::ObjectType.define do
  name 'Location'
  field :id, !types.ID
  field :name, !types.String
end
