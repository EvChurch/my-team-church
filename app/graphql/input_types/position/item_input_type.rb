# frozen_string_literal: true

InputTypes::Position::ItemInputType = GraphQL::InputObjectType.define do
  name 'PositionItemInputType'
  description 'Properties for creating a Item under a position'

  argument :name, !types.String do
    description 'Name of the item.'
  end

  argument :parent_id, types.ID do
    description 'ID of the parent item.'
  end
end
