# frozen_string_literal: true

module Mutations::Team::PositionMutation
  Create = GraphQL::Field.define do
    description 'Create Position'
    argument :team_id, !types.ID
    argument :position, !InputTypes::Team::PositionInputType
    type Types::Team::PositionType
    resolve lambda { |organization, args, _ctx|
      organization.teams
                  .where(id: args[:team_id])
                  .positions
                  .create!(args[:position].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Position'
    argument :id, !types.ID
    argument :position, !InputTypes::Team::PositionInputType
    type Types::Team::PositionType
    resolve lambda { |organization, args, _ctx|
      position = organization.team_positions
                             .kept
                             .find(args[:id])
      position.update!(args[:position].to_h)
      position.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Position'
    argument :id, !types.ID
    type Types::Team::PositionType
    resolve lambda { |organization, args, _ctx|
      position = organization.team_positions
                             .kept
                             .find(args[:id])
      position.discard
      position.decorate
    }
  end
end
