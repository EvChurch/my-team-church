# frozen_string_literal: true

module Mutations::Objective::KeyResultMutation
  Create = GraphQL::Field.define do
    description 'Create ObjectiveKeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :key_result, !InputTypes::Objective::KeyResultInputType
    type Types::Objective::KeyResultType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .create!(args[:key_result].to_h)
                           .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update ObjectiveKeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    argument :key_result, !InputTypes::Objective::KeyResultInputType
    type Types::Objective::KeyResultType
    resolve lambda { |_obj, args, ctx|
      key_result = ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                                        .objectives
                                        .find(args[:objective_id])
                                        .key_results
                                        .find(args[:id])
      key_result.update_attributes!(args[:key_result].to_h)
      key_result.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete ObjectiveKeyResult'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    type Types::Objective::KeyResultType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .find(args[:id])
                           .destroy!
    }
  end
end
