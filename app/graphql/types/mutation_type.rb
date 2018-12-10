# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  field :createDepartment, Mutations::DepartmentMutation::Create
  field :updateDepartment, Mutations::DepartmentMutation::Update
  field :deleteDepartment, Mutations::DepartmentMutation::Delete
  field :createDepartmentLeader, Mutations::Department::LeaderMutation::Create
  field :deleteDepartmentLeader, Mutations::Department::LeaderMutation::Delete
  field :createObjective, Mutations::ObjectiveMutation::Create
  field :updateObjective, Mutations::ObjectiveMutation::Update
  field :deleteObjective, Mutations::ObjectiveMutation::Delete
  field :createObjectiveKeyResult, Mutations::Objective::KeyResultMutation::Create
  field :updateObjectiveKeyResult, Mutations::Objective::KeyResultMutation::Update
  field :deleteObjectiveKeyResult, Mutations::Objective::KeyResultMutation::Delete
  field :createPosition, Mutations::PositionMutation::Create
  field :updatePosition, Mutations::PositionMutation::Update
  field :deletePosition, Mutations::PositionMutation::Delete
  field :createPositionEntity, Mutations::Position::EntityMutation::Create
  field :updatePositionEntity, Mutations::Position::EntityMutation::Update
  field :deletePositionEntity, Mutations::Position::EntityMutation::Delete
  field :createPositionItem, Mutations::Position::ItemMutation::Create
  field :updatePositionItem, Mutations::Position::ItemMutation::Update
  field :deletePositionItem, Mutations::Position::ItemMutation::Delete
  field :deletePersonPositionEntity, Mutations::Position::EntityMutation::DeleteByPerson
  field :authenticateUser, Mutations::UserMutation::Authenticate
  field :createUser, Mutations::UserMutation::Create
  field :createOrganization, Mutations::OrganizationMutation::Create
  field :updateOrganization, Mutations::OrganizationMutation::Update
  field :createOrUpdateIntegration, Mutations::IntegrationMutation::CreateOrUpdate
  field :deleteIntegration, Mutations::IntegrationMutation::Delete
  field :createPerson, Mutations::PersonMutation::Create
  field :updatePerson, Mutations::PersonMutation::Update
  field :createUserLink, Mutations::User::LinkMutation::Create
end
