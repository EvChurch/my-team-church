# frozen_string_literal: true

Types::PositionType = GraphQL::ObjectType.define do
  name 'Position'
  field :name, types.String
  field :objectives, types[Types::ObjectiveType]
  field :department, types[Types::DepartmentType]
  field :people, types[Types::PersonType]
end
