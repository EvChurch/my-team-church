# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :organizations do
    type !types[Types::OrganizationType]
    description 'List of Organizations'
    resolve lambda { |_obj, _args, ctx|
      Organization.with_role(:member, ctx[:user])
    }
  end

  field :organization do
    type Types::OrganizationType
    argument :id, !types.ID
    description 'Find a Organization by ID'
    resolve lambda { |_obj, args, ctx|
      Organization.with_role(:member, ctx[:user])
                  .find(args[:id])
                  .decorate
    }
  end

  field :user do
    type Types::UserType
    description 'Get Current User'
    resolve lambda { |_obj, _args, ctx|
      ctx[:user]
    }
  end

  field :departments do
    type !types[Types::DepartmentType]
    argument :parent_id, types.ID
    description 'List of Departments'
    resolve lambda { |_obj, args, ctx|
      if args[:parent_id]
        ctx[:organization].departments
                          .find(args[:parent_id])
                          .children
                          .decorate
      else
        ctx[:organization].departments
                          .roots
                          .decorate
      end
    }
  end

  field :department do
    type Types::DepartmentType
    argument :id, !types.ID
    description 'Find a Department by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments
                        .find(args[:id])
                        .decorate
    }
  end

  field :objectives do
    type !types[Types::ObjectiveType]
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    description 'List of Objectives'
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .decorate
    }
  end

  field :objective do
    type Types::ObjectiveType
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    description 'List of Objectives'
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .find(args[:id])
                           .decorate
    }
  end

  field :keyResults do
    type !types[Types::KeyResultType]
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    description 'List of Key Results'
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type], [:objectives])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .decorate
    }
  end

  field :keyResult do
    type Types::KeyResultType
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    description 'List of Key Results'
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization],
                                 args[:resource_id],
                                 args[:resource_type],
                                 [objectives: [:key_results]])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .find(args[:id])
                           .decorate
    }
  end

  field :positions do
    type !types[Types::PositionType]
    argument :department_id, !types.ID
    description 'List of Positions'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .where(department_id: args[:department_id])
                        .decorate
    }
  end

  field :position do
    type Types::PositionType
    argument :department_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .where(department_id: args[:department_id])
                        .find(args[:id])
                        .decorate
    }
  end

  field :entities do
    type !types[Types::Position::EntityType]
    argument :department_id, !types.ID
    argument :position_id, !types.ID
    description 'List of Positions'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .where(department_id: args[:department_id])
                        .find(args[:position_id])
                        .entities
                        .includes(:person)
                        .decorate
    }
  end

  field :entity do
    type Types::Position::EntityType
    argument :department_id, !types.ID
    argument :position_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .includes(:entities)
                        .where(department_id: args[:department_id])
                        .find(args[:position_id])
                        .entities
                        .includes(:person)
                        .find(args[:id])
                        .decorate
    }
  end
end

# rubocop:enable Metrics/BlockLength
