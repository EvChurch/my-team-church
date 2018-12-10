# frozen_string_literal: true

Types::PositionType = GraphQL::ObjectType.define do
  name 'Position'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :training_description, types.String
  field :people_needed, types.Int
  field :people_active, types.Int
  field :objectives, types[Types::ObjectiveType]
  field :team, !Types::TeamType
  field :position_entities, types[Types::Position::EntityType]
end
