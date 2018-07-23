# frozen_string_literal: true

module Mutations::Department::LeaderMutation
  Create = GraphQL::Field.define do
    description 'Create DepartmentLeader'
    argument :department_id, !types.ID
    argument :department_leader, !InputTypes::Department::LeaderInputType
    type Types::Department::LeaderType
    resolve lambda { |organization, args, _ctx|
      organization.departments
                  .find(args[:department_id])
                  .leaders
                  .create!(args[:department_leader].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update DepartmentLeader'
    argument :department_id, !types.ID
    argument :id, !types.ID
    argument :department_leader, !InputTypes::Department::LeaderInputType
    type Types::PositionType
    resolve lambda { |organization, args, _ctx|
      leader = organization.departments
                           .find(args[:department_id])
                           .leaders
                           .where(department_id: args[:department_id])
                           .find(args[:id])
      leader.update!(args[:department_leader].to_h)
      leader.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete DepartmentLeader'
    argument :id, !types.ID
    type Types::Department::LeaderType
    resolve lambda { |organization, args, _ctx|
      organization.department_leaders
                  .find(args[:id])
                  .destroy
    }
  end
end
