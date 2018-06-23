# frozen_string_literal: true

module Mutations::ServiceTypeMutation
  Create = GraphQL::Field.define do
    description 'Create ServiceType'
    argument :service_type, !InputTypes::ServiceTypeInputType
    type Types::ServiceTypeType
    resolve lambda { |organization, args, _ctx|
      organization.service_types
                  .create!(args[:service_type].to_h)
                  .decorate
    }
  end

  Update = GraphQL::Field.define do
    description 'Update ServiceType'
    argument :id, !types.ID
    argument :service_type, !InputTypes::ServiceTypeInputType
    type Types::ServiceTypeType
    resolve lambda { |organization, args, _ctx|
      service_type = organization.service_types
                                 .find(args[:id])
      service_type.update!(args[:service_type].to_h)
      service_type.decorate
    }
  end

  Delete = GraphQL::Field.define do
    description 'Delete ServiceType'
    argument :id, !types.ID
    type Types::ServiceTypeType
    resolve lambda { |organization, args, _ctx|
      organization.service_types
                  .find(args[:id])
                  .destroy
    }
  end
end
