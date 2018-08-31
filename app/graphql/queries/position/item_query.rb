# frozen_string_literal: true

module Queries::Position::ItemQuery
  List = GraphQL::Field.define do
    type !types[Types::Position::ItemType]
    argument :position_id, !types.ID
    description 'List of PositionItems'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.position_items.where(position_id: args[:position_id])
    }
    resolve ->(items, _args, _ctx) { items.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::Position::ItemType
    argument :position_id, !types.ID
    argument :id, !types.ID
    description 'Get PositionItem by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.position_items.where(position_id: args[:position_id]).find(args[:id])
    }
    resolve ->(item, _args, _ctx) { item.decorate }
  end
end
