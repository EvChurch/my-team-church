# frozen_string_literal: true

module Mutations::TeamMutation
  Create = GraphQL::Field.define do
    description 'Create Team'
    argument :department_id, !types.ID
    argument :team, !InputTypes::TeamInputType
    type Types::PositionType
    resolve lambda { |organization, args, _ctx|
      organization.departments.find(args[:department_id])
                  .teams
                  .create!(args[:team].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Position'
    argument :department_id, !types.ID
    argument :id, !types.ID
    argument :position, !InputTypes::PositionInputType
    type Types::PositionType
    resolve lambda { |organization, args, _ctx|
      position = organization.positions
                             .kept
                             .where(department_id: args[:department_id])
                             .find(args[:id])
      position.update!(args[:position].to_h)
      position.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Position'
    argument :department_id, !types.ID
    argument :id, !types.ID
    type Types::PositionType
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .where(department_id: args[:department_id])
                  .kept
                  .find(args[:id])
                  .discard
    }
  end
end
