# frozen_string_literal: true

Types::Team::PositionType = GraphQL::ObjectType.define do
  name 'TeamPosition'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :training_description, types.String
  field :people_needed, types.Int
  field :people_active, types.Int
  field :objectives, types[Types::ObjectiveType]
  field :team, !Types::TeamType
  field :entities, types[Types::Team::Position::EntityType]
end
