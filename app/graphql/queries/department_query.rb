# frozen_string_literal: true

module Queries::DepartmentQuery
  List = GraphQL::Field.define do
    type !types[Types::DepartmentType]
    description 'List of Departments'
    before_scope
    resource lambda { |organization, _args, ctx|
      organization.departments
                  .kept
                  .with_leader(ctx[:current_user])
    }
    resolve lambda { |departments, _args, _ctx|
      departments.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::DepartmentType
    argument :id, !types.ID
    description 'Get Department by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.departments
                  .kept
                  .find(args[:id])
    }
    resolve ->(department, _args, _ctx) { department.decorate }
  end
end
