# frozen_string_literal: true

Types::ElvantoType = GraphQL::ObjectType.define do
  name 'Elvanto'
  field :id, !types.ID
  field :client_id, !types.String
  field :client_secret, !types.String
  field :api_key, !types.Float
end
