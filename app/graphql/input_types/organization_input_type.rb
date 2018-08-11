# frozen_string_literal: true

InputTypes::OrganizationInputType = GraphQL::InputObjectType.define do
  name 'OrganizationInputType'
  description 'Properties for creating an Organization'
  argument :name, !types.String { description 'Name of the organization.' }
  argument :website_url, types.String { description 'URL for the organization\'s website.' }
  argument :address_1, !types.String { description 'Line 1 of address for the organization.' }
  argument :address_2, types.String { description 'Line 2 of address for the organization.' }
  argument :city, !types.String { description 'City the organization is primarily located in.' }
  argument :state, !types.String { description 'State the organization is primarily located in.' }
  argument :zip, !types.String { description 'Zip code the organization is primarily located in.' }
  argument :country, !types.String { description 'Country the organization is primarily located in.' }
  argument :time_zone, !types.String { description 'Timezone the organization is primarily located in.' }
end
