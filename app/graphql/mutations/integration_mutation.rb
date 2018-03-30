# frozen_string_literal: true

module Mutations::IntegrationMutation
  CreateOrUpdate = GraphQL::Field.define do
    description 'Create or update Integration'
    argument :integration, InputTypes::IntegrationInputType
    type Types::IntegrationType
    resolve lambda { |_obj, args, ctx|
      integration = ctx[:organization].integrations.find_or_initialize_by(type: args[:integration][:type])
      integration.update_attributes(args[:integration].to_h)
      integration.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete Integration'
    argument :id, !types.ID
    type Types::IntegrationType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].integrations
                        .find(args[:id])
                        .destroy
    }
  end
end
