# frozen_string_literal: true

Types::Team::Position::EntityType = GraphQL::ObjectType.define do
  name 'TeamPositionEntity'
  field :id, !types.ID
  field :position, Types::Team::PositionType
  field :person, Types::PersonType
  field :start_at, Types::DateTimeType
  field :end_at, Types::DateTimeType
  field :trial, types.Boolean
end
