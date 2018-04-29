# frozen_string_literal: true

InputTypes::Department::LeaderInputType = GraphQL::InputObjectType.define do
  name 'DepartmentLeaderInputType'
  description 'Properties for creating a Department -> Person Relationship'

  argument :person_id, !types.ID do
    description 'ID of the Person.'
  end
end
