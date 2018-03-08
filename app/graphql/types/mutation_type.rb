# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createDepartment, Types::DepartmentType do
    description 'Create Department.'
    argument :department, !Types::DepartmentInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments
                        .create!(args[:department].to_h)
                        .decorate
    }
  end

  field :updateDepartment, Types::DepartmentType do
    description 'Update Department.'
    argument :id, !types.ID
    argument :department, !Types::DepartmentInputType
    resolve lambda { |_obj, args, ctx|
      department = ctx[:organization].departments.find(args[:id])
      department.update_attributes!(args[:department].to_h)
      department.decorate
    }
  end

  field :deleteDepartment, Types::DepartmentType do
    description 'Destroy Department.'
    argument :id, !types.ID
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments.find(args[:id]).destroy
    }
  end

  field :createObjective, Types::ObjectiveType do
    description 'Create Objective.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective, !Types::ObjectiveInputType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .create!(args[:objective].to_h)
                           .decorate
    }
  end

  field :updateObjective, Types::ObjectiveType do
    description 'Update Objective.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    argument :objective, !Types::ObjectiveInputType
    resolve lambda { |_obj, args, ctx|
      objective = ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                                       .objectives
                                       .find(args[:id])
      objective.update_attributes!(args[:objective].to_h)
      objective.decorate
    }
  end

  field :deleteObjective, Types::ObjectiveType do
    description 'Destroy Objective.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :id, !types.ID
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:id])
                           .destroy!
    }
  end

  field :createKeyResult, Types::KeyResultType do
    description 'Create KeyResult.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :key_result, !Types::KeyResultInputType
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .create!(args[:key_result].to_h)
                           .decorate
    }
  end

  field :updateKeyResult, Types::KeyResultType do
    description 'Update KeyResult.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    argument :key_result, !Types::KeyResultInputType
    resolve lambda { |_obj, args, ctx|
      key_result = ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                                        .objectives
                                        .find(args[:objective_id])
                                        .key_results
                                        .find(args[:id])
      key_result.update_attributes!(args[:key_result].to_h)
      key_result.decorate
    }
  end

  field :deleteKeyResult, Types::KeyResultType do
    description 'Destroy KeyResult.'
    argument :resource_id, !types.ID
    argument :resource_type, !types.String
    argument :objective_id, !types.ID
    argument :id, !types.ID
    resolve lambda { |_obj, args, ctx|
      ResourceFinderService.find(ctx[:organization], args[:resource_id], args[:resource_type])
                           .objectives
                           .find(args[:objective_id])
                           .key_results
                           .find(args[:id])
                           .destroy!
    }
  end

  field :createPosition, Types::PositionType do
    description 'Create Position.'
    argument :position, Types::PositionInputType
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].departments
                        .create!(args[:department].to_h)
                        .decorate
    }
  end

  field :updatePosition, Types::PositionType do
    description 'Update Position.'
    argument :id, !types.ID
    argument :position, !Types::PositionInputType
    resolve lambda { |_obj, args, ctx|
      position = ctx[:organization].positions.find(args[:id])
      position.update_attributes!(args[:position].to_h)
      position.decorate
    }
  end

  field :deletePosition, Types::PositionType do
    description 'Destroy Position.'
    argument :id, !types.ID
    resolve lambda { |_obj, args, ctx|
      ctx[:organization].positions.find(args[:id]).destroy
    }
  end

  field :authenticateUser, Types::UserType do
    argument :user, !Types::UserInputType
    resolve lambda { |_obj, args, _ctx|
      user = User.find_for_authentication(email: args[:user][:email])
      return unless user
      user.valid_password?(args[:user][:password]) ? user.decorate : nil
    }
  end

  field :createUser, Types::UserType do
    argument :user, !Types::UserInputType
    resolve lambda { |_obj, args, _ctx|
      User.create!(args[:user].to_h)
          .decorate
    }
  end

  field :createOrganization, Types::OrganizationType do
    argument :organization, !Types::OrganizationInputType
    resolve lambda { |_obj, args, ctx|
      organization = Organization.create!(args[:organization].to_h)
      ctx[:user].add_role :member, organization
      ctx[:user].add_role :admin, organization
      organization.decorate
    }
  end
end

# rubocop:enable Metrics/BlockLength
