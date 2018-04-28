# frozen_string_literal: true

module Queries::Objective::KeyResultQuery
  List = GraphQL::Field.define do
    type !types[Types::Objective::KeyResultType]
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    description 'List of Key Results'
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::Objective::KeyResultType
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    description 'List of Key Results'
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization,
                                 args[:resource_id],
                                 args[:resource_type],
                                 [objectives: [:key_results]])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .find(args[:id])
                           .decorate
    }
  end
end
