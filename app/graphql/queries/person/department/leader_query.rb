# frozen_string_literal: true

module Queries::Person::Department::LeaderQuery
  List = GraphQL::Field.define do
    type !types[Types::Department::LeaderType]
    argument :person_id, !types.ID
    description 'List of department leader roles belonging to a person'
    before_scope
    resource lambda { |organization, args, _ctx|
      ids = organization.departments
                        .kept
                        .joins(:leaders)
                        .where(department_leaders: { discarded_at: nil, person_id: args[:person_id] })
                        .pluck('department_leaders.id')
      organization.department_leaders.where(id: ids)
    }
    resolve lambda { |department_leaders, _args, _ctx|
      department_leaders.decorate
    }
  end
end
