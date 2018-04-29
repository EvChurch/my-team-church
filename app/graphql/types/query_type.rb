# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :organizations, Queries::OrganizationQuery::List
  field :organization, Queries::OrganizationQuery::Get
  field :user, Queries::UserQuery::Get
  field :departments, Queries::DepartmentQuery::List
  field :department, Queries::DepartmentQuery::Get
  field :objectives, Queries::ObjectiveQuery::List
  field :objective, Queries::ObjectiveQuery::Get
  field :objectiveKeyResults, Queries::Objective::KeyResultQuery::List
  field :objectiveKeyResult, Queries::Objective::KeyResultQuery::Get
  field :positions, Queries::PositionQuery::List
  field :position, Queries::PositionQuery::Get
  field :positionEntities, Queries::Position::EntityQuery::List
  field :positionEntity, Queries::Position::EntityQuery::Get
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
  field :personPositionEntities, Queries::Person::PositionEntityQuery::List
  field :personPositionEntity, Queries::Person::PositionEntityQuery::Get
end
