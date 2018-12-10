# frozen_string_literal: true

Types::Position::EntityType = GraphQL::ObjectType.define do
  name 'PositionEntity'
  field :id, !types.ID
  field :position, Types::PositionType
  field :person, Types::PersonType
  field :start_at, Types::DateTimeType
  field :end_at, Types::DateTimeType
  field :trial, types.Boolean
end
