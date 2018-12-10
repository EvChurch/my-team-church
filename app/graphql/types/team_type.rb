# frozen_string_literal: true

Types::TeamType = GraphQL::ObjectType.define do
  name 'Team'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :department, Types::DepartmentType
  field :positions_needing_people, types.Int
  field :positions, types[Types::PositionsType]
  field :objectives, types[Types::ObjectiveType]
end
