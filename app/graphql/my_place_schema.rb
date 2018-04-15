# frozen_string_literal: true

MyPlaceSchema = GraphQL::Schema.define do
  default_max_page_size 25
  query Types::QueryType
  mutation Types::MutationType
end
