# frozen_string_literal: true

Types::DepartmentType = GraphQL::ObjectType.define do
  name 'Department'
  field :name, !types.String
  field :children, types[Types::DepartmentType]
  field :positions, types[Types::PositionType]
  field :objectives, types[Types::ObjectiveType]
end
