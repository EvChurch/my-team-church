# frozen_string_literal: true

MyPlaceSchema = GraphQL::Schema.define do
  query(Types::QueryType)
end
