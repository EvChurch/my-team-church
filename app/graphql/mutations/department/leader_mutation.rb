# frozen_string_literal: true

module Mutations::Department::LeaderMutation
  Create = GraphQL::Field.define do
    description 'Create Leader'
    argument :department_id, !types.ID
    argument :leader, !InputTypes::Department::LeaderInputType
    type Types::Department::LeaderType
    resolve lambda { |organization, args, _ctx|
      scope = organization.departments.find(args[:department_id]).leaders
      leader = scope.find_by(args[:leader].to_h)
      leader ||= scope.create!(args[:leader].to_h)
      leader.undiscard
      leader.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Leader'
    argument :id, !types.ID
    type Types::Department::LeaderType
    resolve lambda { |organization, args, _ctx|
      leader = organization.department_leaders
                           .kept
                           .find(args[:id])
      leader.discard
      leader.decorate
    }
  end
end
