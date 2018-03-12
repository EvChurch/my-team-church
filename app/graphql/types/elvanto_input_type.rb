# frozen_string_literal: true

Types::ElvantoInputType = GraphQL::InputObjectType.define do
  name 'ElvantoInputType'
  description 'Properties for creating an Elvanto Integration'

  argument :client_id, !types.String do
    description 'Client ID provided by Elvanto.'
  end

  argument :client_secret, !types.String do
    description 'Client Secret provided by Elvanto.'
  end

  argument :api_key, !types.Float do
    description 'API Key provided by Elvanto.'
  end
end
