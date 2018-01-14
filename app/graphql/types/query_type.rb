# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :organization_index do
    type !types[Types::OrganizationType]
    description 'List of Organizations'
    resolve lambda { |_obj, _args, ctx|
      Organization.with_role(:admin, ctx[:user])
    }
  end

  field :user_get do
    type Types::UserType
    description 'Get Current User'
    resolve lambda { |_obj, _args, ctx|
      ctx[:user]
    }
  end


  field :department_index do
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

  field :department_get do
    type Types::DepartmentType
    argument :id, !types.ID
    description 'Find a Department by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.find_by(id: args['id'])
    }
  end

  field :position_index do
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

  field :position_get do
    type Types::PositionType
    argument :id, !types.ID
    description 'Find a Position by ID'
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions.find_by(id: args['id'])
    }
  end
end
