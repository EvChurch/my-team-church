# frozen_string_literal: true

Types::DepartmentType = GraphQL::ObjectType.define do
  name 'Department'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :parent, Types::DepartmentType
  field :children, types[Types::DepartmentType]
  field :positions, types[Types::PositionType]
  field :objectives, types[Types::ObjectiveType]
end
