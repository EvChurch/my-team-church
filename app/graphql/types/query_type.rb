# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :organizations, Queries::OrganizationQuery::List
  field :organization, Queries::OrganizationQuery::Get
  field :user, Queries::UserQuery::Get
  field :departments, Queries::DepartmentQuery::List
  field :department, Queries::DepartmentQuery::Get
  field :departmentLeaders, Queries::Department::LeaderQuery::List
  field :departmentLeader, Queries::Department::LeaderQuery::Get
  field :objectives, Queries::ObjectiveQuery::List
  field :objective, Queries::ObjectiveQuery::Get
  field :objectiveKeyResults, Queries::Objective::KeyResultQuery::List
  field :objectiveKeyResult, Queries::Objective::KeyResultQuery::Get
  field :teams, Queries::TeamQuery::List
  field :team, Queries::TeamQuery::Get
  field :teamLeaders, Queries::Team::LeaderQuery::List
  field :teamLeader, Queries::Team::LeaderQuery::Get
  field :teamPositions, Queries::Team::PositionQuery::List
  field :teamPosition, Queries::Team::PositionQuery::Get
  field :teamPositionEntities, Queries::Team::Position::EntityQuery::List
  field :teamPositionEntity, Queries::Team::Position::EntityQuery::Get
  field :teamPositionItems, Queries::Team::Position::ItemQuery::List
  field :teamPositionItem, Queries::Team::Position::ItemQuery::Get
  connection :people, Types::PersonType.connection_type do
    argument :search_string, types.String
    description 'List of People'
    resource lambda { |organization, args, _ctx|
      return organization.people if args[:search_string].blank?
      organization.people.where("concat_ws(' ', email, first_name, last_name) ILIKE ?", "%#{args[:search_string]}%")
    }
    resolve ->(people, _args, _ctx) { people.decorate }
  end
  field :person, Queries::PersonQuery::Get
  field :me, Queries::PersonQuery::Me
  field :personTeamPositionEntities, Queries::Person::Team::Position::EntityQuery::List
  field :integrations, Queries::IntegrationQuery::List
  field :integration, Queries::IntegrationQuery::Get
  field :admins, Queries::AdminQuery::List
  field :admin, Queries::AdminQuery::Get
  connection :users, Types::PersonType.connection_type do
    argument :search_string, types.String
    description 'List of Users'
    resource lambda { |organization, args, _ctx|
      return organization.users if args[:search_string].blank?
      organization.users.where("concat_ws(' ', email, first_name, last_name) ILIKE ?", "%#{args[:search_string]}%")
    }
    resolve ->(users, _args, _ctx) { users.decorate }
  end
end
