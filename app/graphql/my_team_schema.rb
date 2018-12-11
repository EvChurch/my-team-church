# frozen_string_literal: true

MyTeamSchema = GraphQL::Schema.define do
  default_max_page_size 25

  # The last Instrumenter is executed first, so make sure these are in the correct order
  instrument :field, GraphQL::Pundit::Instrumenter.new
  instrument :field, Instrumenters::NotFoundUnlessInstrumenter.new
  instrument :field, Instrumenters::ResourceInstrumenter.new

  query Types::QueryType
  mutation Types::MutationType
end

GraphQL::Errors.configure(MyTeamSchema) do
  rescue_from ActiveRecord::RecordNotFound do
    nil
  end

  rescue_from ActiveRecord::RecordInvalid do |e, _obj, _args, ctx|
    e.record.errors.messages.each do |key, message|
      error = GraphQL::ExecutionError.new(message.join(','))
      error.path = ctx.path + [key]
      ctx.add_error(error)
    end
    GraphQL::ExecutionError.new e.message
  end

  rescue_from StandardError do |e|
    GraphQL::ExecutionError.new e.message
  end
end
