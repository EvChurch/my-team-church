# frozen_string_literal: true

module Mutations::Team::Position::ItemMutation
  Create = GraphQL::Field.define do
    description 'Create Item'
    argument :position_id, !types.ID
    argument :item, !InputTypes::Team::Position::ItemInputType
    type Types::Position::ItemType
    resolve lambda { |organization, args, _ctx|
      organization.team_positions
                  .find(args[:position_id])
                  .items
                  .create!(args[:item].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Item'
    argument :id, !types.ID
    argument :item, !InputTypes::Team::Position::ItemInputType
    type Types::DepartmentType
    resolve lambda { |organization, args, _ctx|
      item = organization.team_position_items
                         .kept
                         .find_by(id: args[:id])
      item.update!(args[:item].to_h)
      item.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Item'
    argument :id, !types.ID
    type Types::Team::Position::ItemType
    resolve lambda { |organization, args, _ctx|
      item = organization.team_position_items
                         .kept
                         .find(args[:id])
      item.discard
      item.decorate
    }
  end
end
