# frozen_string_literal: true

Types::DepartmentType = GraphQL::ObjectType.define do
  name 'Department'
  field :id, !types.ID
  field :name, !types.String
  field :breadcrumb, !types.String
  field :description, types.String
  field :parent, Types::DepartmentType
  field :parent_id, types.ID
  field :positions_needing_people, types.Int
  field :children, types[Types::DepartmentType]
  field :leaders, types[Types::Department::LeaderType]
  field :teams, types[Types::TeamType]
  field :objectives, types[Types::ObjectiveType]
end
