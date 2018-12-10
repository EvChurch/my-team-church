# frozen_string_literal: true

module Mutations::Objective::KeyResultMutation
  Create = GraphQL::Field.define do
    description 'Create KeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :key_result, !InputTypes::Objective::KeyResultInputType
    type Types::Objective::KeyResultType
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .create!(args[:key_result].to_h)
                           .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update KeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    argument :key_result, !InputTypes::Objective::KeyResultInputType
    type Types::Objective::KeyResultType
    resolve lambda { |organization, args, _ctx|
      key_result = ResourceFinderService.find(organization, args[:resource_id], args[:resource_type])
                                        .objectives
                                        .find(args[:objective_id])
                                        .key_results
                                        .kept
                                        .find(args[:id])
      key_result.update!(args[:key_result].to_h)
      key_result.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete KeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    type Types::Objective::KeyResultType
    resolve lambda { |organization, args, _ctx|
      key_result = ResourceFinderService.find(organization, args[:resource_id], args[:resource_type])
                                        .objectives
                                        .kept
                                        .find(args[:objective_id])
                                        .key_results
                                        .kept
                                        .find(args[:id])
      key_result.discard
      key_result.decorate
    }
  end
end
