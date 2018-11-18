# frozen_string_literal: true

Types::IntegrationType = GraphQL::ObjectType.define do
  name 'Integration'
  field :id, !types.ID
  field :type, !types.String
  field :active, !types.Boolean
end
