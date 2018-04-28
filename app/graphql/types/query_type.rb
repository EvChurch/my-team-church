# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :organizations do
    type !types[Types::OrganizationType]
    description 'List of Organizations'
    resolve lambda { |_obj, _args, ctx|
      OrganizationPolicy::Scope.new(ctx[:user], Organization)
                               .resolve
                               .decorate
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
    description 'List of Departments'
    resolve lambda { |_obj, _args, ctx|
      ctx[:organization].departments
                        .decorate
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

  field :objectiveKeyResults do
    type !types[Types::Objective::KeyResultType]
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

  field :objectiveKeyResult do
    type Types::Objective::KeyResultType
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

  field :positionEntities do
    type !types[Types::Position::EntityType]
    argument :position_id, !types.ID
    description 'List of Positions'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .find(args[:position_id])
                        .entities
                        .includes(:person)
                        .decorate
    }
  end

  field :positionEntity do
    type Types::Position::EntityType
    argument :position_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions
                        .includes(:entities)
                        .find(args[:position_id])
                        .entities
                        .includes(:person)
                        .find(args[:id])
                        .decorate
    }
  end

  connection :people, Types::PersonType.connection_type do
    argument :search_string, types.String
    description 'List of People'
    resolve lambda { |_obj, args, ctx|
      people = ctx[:organization].people
      if args[:search_string].present?
        people = people.where("concat_ws(' ', email, first_name, last_name) ILIKE ?", "%#{args[:search_string]}%")
      end
      people.decorate
    }
  end

  field :person do
    type Types::PersonType
    argument :id, !types.ID
    description 'Find a Person by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].people
                        .find(args[:id])
                        .decorate
    }
  end

  field :personPositionEntities do
    type !types[Types::Position::EntityType]
    argument :person_id, !types.ID
    description 'List of Positions belonging to a person'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].people
                        .find(args[:person_id])
                        .position_entities
                        .includes(:position)
                        .decorate
    }
  end

  field :personPositionEntity do
    type Types::Position::EntityType
    argument :person_id, !types.ID
    argument :id, !types.ID
    description 'Find a Position by ID belonging to a person'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].people
                        .find(args[:person_id])
                        .position_entities
                        .includes(position: :department)
                        .find(args[:id])
                        .decorate
    }
  end

  field :me do
    type Types::PersonType
    description 'Find Person associated with user'
    resolve lambda { |_obj, _args, ctx|
      ctx[:organization].user_links
                        .find_by!(user: ctx[:user])
                        .person
                        .decorate
    }
  end
end

# rubocop:enable Metrics/BlockLength
