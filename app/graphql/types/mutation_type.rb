# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  field :createDepartment, Mutations::DepartmentMutation::Create
  field :updateDepartment, Mutations::DepartmentMutation::Update
  field :deleteDepartment, Mutations::DepartmentMutation::Delete
  field :createObjective, Mutations::ObjectiveMutation::Create
  field :updateObjective, Mutations::ObjectiveMutation::Update
  field :deleteObjective, Mutations::ObjectiveMutation::Delete
  field :createKeyResult, Mutations::Objective::KeyResultMutation::Create
  field :updateKeyResult, Mutations::Objective::KeyResultMutation::Update
  field :deleteKeyResult, Mutations::Objective::KeyResultMutation::Delete
  field :createPosition, Mutations::PositionMutation::Create
  field :updatePosition, Mutations::PositionMutation::Update
  field :deletePosition, Mutations::PositionMutation::Delete
  field :authenticateUser, Mutations::UserMutation::Authenticate
  field :createUser, Mutations::UserMutation::Create
  field :createOrganization, Mutations::OrganizationMutation::Create
  field :updateOrganization, Mutations::OrganizationMutation::Update
  field :createOrUpdateIntegration, Mutations::IntegrationMutation::CreateOrUpdate
  field :deleteIntegration, Mutations::IntegrationMutation::Delete
end
