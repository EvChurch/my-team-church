# frozen_string_literal: true

# Instrumenter that allows returning 'resource not found' based on policies
class Instrumenters::NotFoundUnlessInstrumenter
  # rubocop:disable Metrics/MethodLength
  def instrument(_type, field)
    # rubocop:enable Metrics/MethodLength
    query = field.metadata[:not_found_unless]
    return field unless query

    old_resolve = field.resolve_proc
    field.redefine do
      resolve(lambda do |root, arguments, context|
        policy = Pundit.policy!(context[:current_user], root)
        return old_resolve.call(root, arguments, context) if policy.public_send(query.to_s + '?')

        context.add_error(GraphQL::ExecutionError.new('resource not found'))
        nil
      end)
    end
  end
end

GraphQL::Field.accepts_definitions(
  not_found_unless:
    GraphQL::Define::InstanceDefinable::AssignMetadataKey.new(:not_found_unless)
)
