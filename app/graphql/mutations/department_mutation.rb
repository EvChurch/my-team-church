# frozen_string_literal: true

module Mutations::DepartmentMutation
  Create = GraphQL::Field.define do
    description 'Create Department'
    argument :department, !InputTypes::DepartmentInputType
    type Types::DepartmentType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments
                        .create!(args[:department].to_h)
                        .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Department'
    argument :id, !types.ID
    argument :department, !InputTypes::DepartmentInputType
    type Types::DepartmentType
    resolve lambda { |_obj, args, ctx|
      department = ctx[:organization].departments.find(args[:id])
      department.update_attributes!(args[:department].to_h)
      department.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Department'
    argument :id, !types.ID
    type Types::DepartmentType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.find(args[:id]).destroy
    }
  end
end
