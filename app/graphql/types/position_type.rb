# frozen_string_literal: true

Types::PositionType = GraphQL::ObjectType.define do
  name 'Position'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :objectives, types[Types::ObjectiveType]
  field :department, !Types::DepartmentType
  field :people, types[Types::PersonType]
end
