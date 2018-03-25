# frozen_string_literal: true

Types::IntegrationInputType = GraphQL::InputObjectType.define do
  name 'IntegrationInputType'
  description 'Properties for creating an Integration'

  argument :client_id, !types.String do
    description 'Client ID provided by Integration Partner.'
  end

  argument :client_secret, !types.String do
    description 'Client Secret provided by Integration Partner.'
  end

  argument :api_key, !types.String do
    description 'API Key provided by Integration Partner.'
  end

  argument :type, !types.String do
    description 'One of [Integration::Elvanto]'
  end
end
