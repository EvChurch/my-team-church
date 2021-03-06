# frozen_string_literal: true

module Mutations::DepartmentMutation
  Create = GraphQL::Field.define do
    description 'Create Department'
    argument :department, !InputTypes::DepartmentInputType
    type Types::DepartmentType
    resolve lambda { |organization, args, _ctx|
      organization.departments
                  .create!(args[:department].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Department'
    argument :id, !types.ID
    argument :department, !InputTypes::DepartmentInputType
    type Types::DepartmentType
    resolve lambda { |organization, args, _ctx|
      department = organization.departments
                               .kept
                               .find(args[:id])
      department.update!(args[:department].to_h)
      department.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Department'
    argument :id, !types.ID
    type Types::DepartmentType
    resolve lambda { |organization, args, _ctx|
      department = organization.departments
                               .kept
                               .find(args[:id])
      department.discard
      department.decorate
    }
  end
end
