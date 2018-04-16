# frozen_string_literal: true

Types::Objective::KeyResultType = GraphQL::ObjectType.define do
  name 'objectiveKeyResult'
  field :id, !types.ID
  field :name, !types.String
  field :result_type, !types.String
  field :start_value, !types.Float
  field :target_value, !types.Float
  field :current_value, !types.Float
  field :weight, !types.Float

  field :objective, Types::ObjectiveType
end