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
      Organization.with_role(:member, ctx[:user]).find_by(id: args['id'])
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
      if args['parent_id']
        ctx[:organization].departments.find_by(id: args['parent_id']).children
      else
        ctx[:organization].departments.roots
      end
    }
  end

  field :department do
    type Types::DepartmentType
    argument :id, !types.ID
    description 'Find a Department by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.find_by(id: args['id'])
    }
  end

  field :positions do
    type !types[Types::PositionType]
    argument :department_id, types.ID
    description 'List of Positions'
    resolve lambda { |_obj, args, ctx|
      collection = ctx[:organization].positions
      if args['parent_id']
        collection.where(department_id: args['department_id'])
      else
        collection
      end
    }
  end

  field :position do
    type Types::PositionType
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions.find_by(id: args['id'])
    }
  end
end

# rubocop:enable Metrics/BlockLength
