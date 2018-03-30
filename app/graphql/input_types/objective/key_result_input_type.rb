# frozen_string_literal: true

InputTypes::Objective::KeyResultInputType = GraphQL::InputObjectType.define do
  name 'KeyResultInputType'
  description 'Properties for creating a Key Result'

  argument :name, !types.String do
    description 'Name of the key result.'
  end

  argument :result_type, !types.String do
    description 'Result type e.g %.'
  end

  argument :start_value, !types.Float do
    description 'Start Value.'
  end

  argument :target_value, !types.Float do
    description 'Target Value.'
  end

  argument :current_value, !types.Float do
    description 'Current Value.'
  end

  argument :weight, !types.Float do
    description 'Weight is used to increase or decrease importance of single Key Result.'
  end
end
