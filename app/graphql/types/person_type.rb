# frozen_string_literal: true

Types::PersonType = GraphQL::ObjectType.define do
  name 'Person'
  field :id, !types.ID
  field :first_name, types.String
  field :last_name, types.String
  field :positions, types[Types::PositionType]
  field :departments, types[Types::DepartmentType]
  field :objectives, types[Types::ObjectiveType]
end
