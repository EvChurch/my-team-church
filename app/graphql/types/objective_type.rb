# frozen_string_literal: true

Types::ObjectiveType = GraphQL::ObjectType.define do
  name 'Objective'
  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
  field :children, types[Types::ObjectiveType]
  field :parents, types[Types::ObjectiveType]
  field :key_results, types[Types::KeyResultType]
end
