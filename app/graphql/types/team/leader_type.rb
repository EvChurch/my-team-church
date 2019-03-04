# frozen_string_literal: true

Types::Team::LeaderType = GraphQL::ObjectType.define do
  name 'TeamLeader'
  field :id, !types.ID
  field :team, Types::TeamType
  field :person, Types::PersonType
  field :entities, types[Types::Team::Position::EntityType]
end
