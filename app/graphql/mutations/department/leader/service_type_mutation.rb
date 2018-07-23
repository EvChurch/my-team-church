# frozen_string_literal: true

module Mutations::Department::Leader::ServiceTypeMutation
    Create = GraphQL::Field.define do
      description 'Create DepartmentLeaderServiceType'
      argument :leader_id, !types.ID
      argument :leader_service_type, !InputTypes::Department::Leader::ServiceTypeInputType
      type Types::Department::Leader::ServiceTypeType
      resolve lambda { |organization, args, _ctx|
        organization.department_leaders
                    .find(args[:leader_id])
                    .leader_service_types
                    .create!(args[:leader_service_type].to_h)
                    .decorate
      }
    end

    Delete = GraphQL::Field.define do
      description 'Delete DepartmentLeaderServiceType'
      argument :leader_id, !types.ID
      argument :id, !types.ID
      type Types::Department::Leader::ServiceTypeType
      resolve lambda { |organization, args, _ctx|
        organization.department_leaders
                    .find(args[:leader_id])
                    .leader_service_types
                    .find(args[:id])
                    .destroy
                    .decorate
      }
    end
  end
