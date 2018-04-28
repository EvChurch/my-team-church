# frozen_string_literal: true

module Mutations::OrganizationMutation
  Create = GraphQL::Field.define do
    description 'Create Organization'
    argument :organization, !InputTypes::OrganizationInputType
    type Types::OrganizationType
    resolve lambda { |_obj, args, ctx|
      organization = Organization.create!(args[:organization].to_h)
      ctx[:current_user].add_role :member, organization
      ctx[:current_user].add_role :admin, organization
      organization.decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update Organization'
    argument :id, !types.ID
    argument :organization, !InputTypes::OrganizationInputType
    type Types::OrganizationType
    resolve lambda { |_obj, args, ctx|
      organization = Organization.with_role(:admin, ctx[:current_user])
                                 .find(args[:id])
      organization.update_attributes!(args[:organization].to_h)
      organization.decorate
    }
  end
end
