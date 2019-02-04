# frozen_string_literal: true

module Queries::Department::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Department::LeaderType]
    argument :department_id, !types.ID
    description 'List of people leading a department'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.department_leaders
                  .kept
                  .where(department_id: args[:department_id])
    }
    resolve lambda { |department_leaders, _args, _ctx|
      department_leaders.decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Department::LeaderType
    argument :id, !types.ID
    description 'Get Leader Role by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.department_leaders
                  .kept
                  .find(args[:id])
    }
    resolve ->(department_leader, _args, _ctx) { department_leader.decorate }
  end
end
