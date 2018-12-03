# frozen_string_literal: true

InputTypes::IntegrationInputType = GraphQL::InputObjectType.define do
  name 'IntegrationInputType'
  description 'Properties for creating an Integration'

  argument :api_key, types.String do
    description 'API Key provided by Integration Partner.'
  end

  argument :type, !types.String do
    description 'One of [Integration::Elvanto, Integration::Fluro]'
  end

  argument :username, !types.String do
    description 'Username for account provided by Integration Partner.'
  end

  argument :password, !types.String do
    description 'Password for account provided by Integration Partner.'
  end

  argument :domain, types.String do
    description 'Domain provided by Integration Partner.'
  end
end
