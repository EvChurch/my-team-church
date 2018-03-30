# frozen_string_literal: true

InputTypes::DepartmentInputType = GraphQL::InputObjectType.define do
  name 'DepartmentInputType'
  description 'Properties for creating a Department'

  argument :name, !types.String do
    description 'Name of the department.'
  end

  argument :description, types.String do
    description 'Description of the post.'
  end

  argument :parent_id, types.ID do
    description 'ID of the parent department.'
  end
end
