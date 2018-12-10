# frozen_string_literal: true

module Queries::Team::Position::ItemQuery
  List = GraphQL::Field.define do
    type !types[Types::Team::Position::ItemType]
    argument :team_id, !types.ID
    argument :position_id, !types.ID
    description 'List of Items'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.team_position_items
                  .kept
                  .where(team_positions: { id: args[:position_id] }, teams: { id: args[:team_id] })
                  .order(order: :asc)
    }
    resolve ->(items, _args, _ctx) { items.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::Team::Position::ItemType
    argument :id, !types.ID
    description 'Get Item by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.team_position_items
                  .kept
                  .find(args[:id])
    }
    resolve ->(item, _args, _ctx) { item.decorate }
  end
end
