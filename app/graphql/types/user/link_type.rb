# frozen_string_literal: true

Types::User::LinkType = GraphQL::ObjectType.define do
  name 'UserLink'
  field :id, !types.ID
  field :organization, Types::OrganizationType
  field :user, Types::UserType
  field :person, Types::PersonType
end
