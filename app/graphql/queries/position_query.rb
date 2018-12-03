# frozen_string_literal: true

module Queries::PositionQuery
  List = GraphQL::Field.define do
    type !types[Types::PositionType]
    argument :department_id, !types.ID
    description 'List of Positions'
    before_scope
    resource lambda { |organization, args, _ctx|
      organization.positions.kept.where(department_id: args[:department_id])
    }
    resolve ->(positions, _args, _ctx) { positions.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::PositionType
    argument :department_id, !types.ID
    argument :id, !types.ID
    description 'Get Position by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.positions.kept.find(args[:id])
    }
    resolve ->(position, _args, _ctx) { position.decorate }
  end
end
