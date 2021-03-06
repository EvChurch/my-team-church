# frozen_string_literal: true

Types::PersonType = GraphQL::ObjectType.define do
  name 'Person'
  field :id, !types.ID
  field :name, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :picture, types.String
  field :email, types.String
  field :mobile, types.String
  field :phone, types.String
  field :gender, types.String
  field :invite_url, types.String
  field :invitable, !types.Boolean
  field :positions, types[Types::Team::PositionType]
  field :departments, types[Types::DepartmentType]
  field :objectives, types[Types::ObjectiveType]
  field :users, types[Types::UserType]
end
