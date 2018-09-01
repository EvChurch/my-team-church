# frozen_string_literal: true

module Mutations::Position::ItemMutation
  Create = GraphQL::Field.define do
    description 'Create PositionItem'
    argument :position_id, !types.ID
    argument :position_item, !InputTypes::Position::ItemInputType
    type Types::Position::ItemType
    resolve lambda { |organization, args, _ctx|
      organization.positions
                  .find(args[:position_id])
                  .items
                  .create!(args[:position_item].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update PositionItem'
    argument :id, !types.ID
    argument :position_item, !InputTypes::Position::ItemInputType
    type Types::DepartmentType
    resolve lambda { |organization, args, _ctx|
      position_item = organization.position_items
                                  .find_by(id: args[:id])
      position_item.update!(args[:position_item].to_h)
      position_item.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete PositionItem'
    argument :id, !types.ID
    type Types::Position::ItemType
    resolve lambda { |organization, args, _ctx|
      organization.position_items
                  .find_by(id: args[:id])
                  .destroy
    }
  end
end
