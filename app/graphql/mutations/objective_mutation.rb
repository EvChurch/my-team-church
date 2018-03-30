# frozen_string_literal: true

module Mutations::ObjectiveMutation
  Create = GraphQL::Field.define do
    description 'Create Objective'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective, !InputTypes::ObjectiveInputType
    type Types::ObjectiveType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .create!(args[:objective].to_h)
                           .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Objective'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    argument :objective, !InputTypes::ObjectiveInputType
    type Types::ObjectiveType
    resolve lambda { |_obj, args, ctx|
      objective = ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                                       .objectives
                                       .find(args[:id])
      objective.update_attributes!(args[:objective].to_h)
      objective.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Objective'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    type Types::ObjectiveType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:id])
                           .destroy!
    }
  end
end
