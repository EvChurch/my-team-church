# frozen_string_literal: true

InputTypes::Team::PositionInputType = GraphQL::InputObjectType.define do
  name 'TeamPositionInputType'
  description 'Properties for creating a Position'

  argument :name, types.String do
    description 'Name of the Position.'
  end

  argument :description, types.String do
    description 'Job Description of the position.'
  end

  argument :training_description, types.String do
    description 'Training required for the position.'
  end

  argument :people_needed, types.Int do
    description 'Number of people needed to actively serve in the position.'
  end

  argument :team_id, types.ID do
    description 'ID of the parent Team.'
  end
end
