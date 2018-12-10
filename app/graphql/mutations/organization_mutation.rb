# frozen_string_literal: true

module Mutations::OrganizationMutation
  Create = GraphQL::Field.define do
    description 'Create Organization'
    argument :organization, !InputTypes::OrganizationInputType
    type Types::OrganizationType
    resolve lambda { |_organization, args, ctx|
      new_organization = Organization.create!(args[:organization].to_h)
      new_organization.add_first_admin(ctx[:current_user])
      new_organization.decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Organization'
    argument :id, !types.ID
    argument :organization, !InputTypes::OrganizationInputType
    type Types::OrganizationType
    resolve lambda { |_organization, args, ctx|
      organization = Organization.with_role(:admin, ctx[:current_user])
                                 .kept
                                 .find(args[:id])
      organization.update!(args[:organization].to_h)
      organization.decorate
    }
  end
end
