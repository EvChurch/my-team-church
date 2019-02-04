# frozen_string_literal: true

module Queries::Person::Department::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Department::LeaderType]
    argument :person_id, !types.ID
    description 'List of department leader roles belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.department_leaders
                  .kept
                  .where(person_id: args[:person_id])
    }
    resolve lambda { |department_leaders, _args, _ctx|
      department_leaders.decorate
    }
  end
end
