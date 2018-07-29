# frozen_string_literal: true

module Queries::ObjectiveQuery
  List = GraphQL::Field.define do
    type !types[Types::ObjectiveType]
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    description 'List of Objectives'
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .decorate
    }
  end

  Get = GraphQL::Field.define do
    type Types::ObjectiveType
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    description 'Objective'
    resolve lambda { |organization, args, _ctx|
      ResourceFinderService.find(organization, args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .find(args[:id])
                           .decorate
    }
  end
end
