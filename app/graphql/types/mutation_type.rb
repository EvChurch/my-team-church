# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :department_create, Types::DepartmentType do
    description 'Create Department.'
    argument :department, Types::DepartmentInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.create!(args[:department].to_h)
    }
  end

  field :department_update, Types::DepartmentType do
    description 'Update Department.'
    argument :id, !types.ID
    argument :department, !Types::DepartmentInputType
    resolve lambda { |_obj, args, ctx|
      department = ctx[:organization].departments.find_by!(id: args[:id])
      department.update_attributes!(args[:department].to_h)
      department
    }
  end

  field :department_destroy, Types::DepartmentType do
    description 'Destroy Department.'
    argument :id, !types.ID
    argument :department, !Types::DepartmentInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.find_by!(id: args[:id]).destroy
    }
  end

  field :position_create, Types::PositionType do
    description 'Create Position.'
    argument :position, Types::PositionInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.create!(args[:department].to_h)
    }
  end

  field :position_update, Types::PositionType do
    description 'Update Position.'
    argument :id, !types.ID
    argument :position, !Types::PositionInputType
    resolve lambda { |_obj, args, ctx|
      position = ctx[:organization].positions.find_by!(id: args[:id])
      position.update_attributes!(args[:position].to_h)
      position
    }
  end

  field :position_destroy, Types::PositionType do
    description 'Destroy Position.'
    argument :id, !types.ID
    argument :position, !Types::PositionInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions.find_by!(id: args[:id]).destroy
    }
  end
end
