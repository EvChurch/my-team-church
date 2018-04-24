# frozen_string_literal: true

InputTypes::PersonInputType = GraphQL::InputObjectType.define do
  name 'PersonInputType'
  description 'Properties for creating a Person'

  argument :first_name, types.String do
    description 'First name of the Person.'
  end

  argument :last_name, types.String do
    description 'Last name of the Person.'
  end

  argument :email, types.String do
    description 'Email of the Person.'
  end

  argument :phone, types.String do
    description 'Pnhone of the Person.'
  end

  argument :mobile, types.String do
    description 'Mobile of the Person.'
  end

  argument :gender, types.String do
    description 'Gender of the Person.'
  end
end
