# frozen_string_literal: true

InputTypes::Team::Position::ItemInputType = GraphQL::InputObjectType.define do
  name 'TeamPositionItemInputType'
  description 'Properties for creating a Item under a position'

  argument :name, !types.String do
    description 'Name of the item.'
  end

  argument :parent_id, types.ID do
    description 'ID of the parent item.'
  end

  argument :order, types.Float do
    description 'position in the checklist the item should appear.'
  end
end
