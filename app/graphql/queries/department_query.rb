# frozen_string_literal: true

module Queries::DepartmentQuery
  List = GraphQL::Field.define do
    type !types[Types::DepartmentType]
    description 'List of Departments'
    before_scope
    resource lambda { |organization, _args, _ctx|
      organization.departments
    }
    resolve lambda { |departments, _args, _ctx|
      departments.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::DepartmentType
    argument :id, !types.ID
    description 'Find a Department by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.departments.find(args[:id])
    }
    resolve lambda { |department, _args, _ctx|
      department.decorate
    }
  end
end
