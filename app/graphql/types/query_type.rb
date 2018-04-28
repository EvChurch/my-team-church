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
  connection :people, Queries::PersonQuery::List
  field :person, Queries::PersonQuery::Get
  field :me, Queries::PersonQuery::Me
  field :personPositionEntities, Queries::Person::PositionEntityQuery::List
  field :personPositionEntity, Queries::Person::PositionEntityQuery::Get
end
