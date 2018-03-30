# frozen_string_literal: true

module Mutations::PositionMutation
  Create = GraphQL::Field.define do
    description 'Create Position'
    argument :department_id, !types.ID
    argument :position, !InputTypes::PositionInputType
    type Types::PositionType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .where(department_id: args[:department_id])
                        .create!(args[:position].to_h)
                        .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Position'
    argument :department_id, !types.ID
    argument :id, !types.ID
    argument :position, !InputTypes::PositionInputType
    type Types::PositionType
    resolve lambda { |_obj, args, ctx|
      position = ctx[:organization].positions
                                   .where(department_id: args[:department_id])
                                   .find(args[:id])
      position.update_attributes!(args[:position].to_h)
      position.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Position'
    argument :department_id, !types.ID
    argument :id, !types.ID
    type Types::PositionType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .where(department_id: args[:department_id])
                        .find(args[:id])
                        .destroy
    }
  end
end
