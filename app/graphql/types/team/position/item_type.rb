# frozen_string_literal: true

Types::Team::Position::ItemType = GraphQL::ObjectType.define do
  name 'TeamPositionItem'
  field :id, !types.ID
  field :name, !types.String
  field :order, !types.Float
  field :position, Types::Team::PositionType
  field :parent, Types::DepartmentType
end
