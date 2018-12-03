# frozen_string_literal: true

module Queries::IntegrationQuery
  List = GraphQL::Field.define do
    type !types[Types::IntegrationType]
    description 'List of Integrations'
    before_scope
    resource lambda { |organization, _args, _ctx|
      organization.integrations
    }
    resolve ->(integrations, _args, _ctx) { integrations.decorate }
  end

  Get = GraphQL::Field.define do
    type Types::ServiceTypeType
    argument :id, !types.ID
    description 'Get Integrations by ID'
    authorize :show
    resource lambda { |organization, args, _ctx|
      organization.integrations.find(args[:id])
    }
    resolve ->(integration, _args, _ctx) { integration.decorate }
  end
end
