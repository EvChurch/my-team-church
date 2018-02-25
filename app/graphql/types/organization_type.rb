# frozen_string_literal: true

Types::OrganizationType = GraphQL::ObjectType.define do
  name 'Organization'
  field :id, !types.ID
  field :name, !types.String
  field :website_url, types.String
  field :address_1, !types.String
  field :address_2, types.String
  field :city, !types.String
  field :state, !types.String
  field :zip, !types.String
  field :country, !types.String
  field :time_zone, !types.String
end
