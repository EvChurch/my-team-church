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
  field :createTeam, Mutations::TeamMutation::Create
  field :updateTeam, Mutations::TeamMutation::Update
  field :deleteTeam, Mutations::TeamMutation::Delete
  field :createTeamPosition, Mutations::Team::PositionMutation::Create
  field :updateTeamPosition, Mutations::Team::PositionMutation::Update
  field :deleteTeamPosition, Mutations::Team::PositionMutation::Delete
  field :createTeamPositionEntity, Mutations::Team::Position::EntityMutation::Create
  field :updateTeamPositionEntity, Mutations::Team::Position::EntityMutation::Update
  field :deleteTeamPositionEntity, Mutations::Team::Position::EntityMutation::Delete
  field :createTeamPositionItem, Mutations::Team::Position::ItemMutation::Create
  field :updateTeamPositionItem, Mutations::Team::Position::ItemMutation::Update
  field :deleteTeamPositionItem, Mutations::Team::Position::ItemMutation::Delete
  field :authenticateUser, Mutations::UserMutation::Authenticate
  field :createUser, Mutations::UserMutation::Create
  field :createOrganization, Mutations::OrganizationMutation::Create
  field :updateOrganization, Mutations::OrganizationMutation::Update
  field :createOrUpdateIntegration, Mutations::IntegrationMutation::CreateOrUpdate
  field :deleteIntegration, Mutations::IntegrationMutation::Delete
  field :createPerson, Mutations::PersonMutation::Create
  field :updatePerson, Mutations::PersonMutation::Update
  field :createUserLink, Mutations::User::LinkMutation::Create
  field :createAdmin, Mutations::AdminMutation::Create
  field :deleteAdmin, Mutations::AdminMutation::Delete
end
