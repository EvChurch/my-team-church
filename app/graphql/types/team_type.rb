# frozen_string_literal: true

Types::TeamType = GraphQL::ObjectType.define do
  name 'Team'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :departments, types[Types::DepartmentType]
  field :positions_needing_people, types.Int
  field :positions, types[Types::Team::PositionType]
  field :objectives, types[Types::ObjectiveType]
end
