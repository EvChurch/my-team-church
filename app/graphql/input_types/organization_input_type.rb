# frozen_string_literal: true

InputTypes::OrganizationInputType = GraphQL::InputObjectType.define do
  name 'OrganizationInputType'
  description 'Properties for creating an Organization'

  argument :name, !types.String do
    description 'Name of the organization.'
  end

  argument :website_url, types.String do
    description 'URL for the organization\'s website.'
  end

  argument :address_1, !types.String do
    description 'Line 1 of address for the organization.'
  end

  argument :address_2, types.String do
    description 'Line 2 of address for the organization.'
  end

  argument :city, !types.String do
    description 'City the organization is primarily located in.'
  end

  argument :state, !types.String do
    description 'State the organization is primarily located in.'
  end

  argument :zip, !types.String do
    description 'Zip code the organization is primarily located in.'
  end

  argument :country, !types.String do
    description 'Country the organization is primarily located in.'
  end

  argument :time_zone, !types.String do
    description 'Timezone the organization is primarily located in.'
  end
end
