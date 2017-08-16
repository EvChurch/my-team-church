# frozen_string_literal: true

MyPlaceSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Types::MutationType
end
