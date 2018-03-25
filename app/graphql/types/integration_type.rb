# frozen_string_literal: true

Types::IntegrationType = GraphQL::ObjectType.define do
  name 'Integration'
  field :id, !types.ID
  field :type, !types.String
  field :client_id, !types.String
  field :client_secret, !types.String
  field :api_key, !types.String
  field :type, !types.String
end
