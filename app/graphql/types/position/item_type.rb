# frozen_string_literal: true

Types::Position::ItemType = GraphQL::ObjectType.define do
  name 'PositionItem'
  field :id, !types.ID
  field :name, !types.String
  field :order, !types.Float
  field :position, Types::PositionType
  field :parent, Types::DepartmentType
end
