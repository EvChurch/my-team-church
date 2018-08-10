# frozen_string_literal: true

MyTeamSchema = GraphQL::Schema.define do
  default_max_page_size 25

  # The last Instrumenter is executed first, so make sure these are in the
  # correct order
  instrument :field, GraphQL::Pundit::Instrumenter.new
  instrument :field, Instrumenters::NotFoundUnlessInstrumenter.new
  instrument :field, Instrumenters::ResourceInstrumenter.new

  query Types::QueryType
  mutation Types::MutationType
end
