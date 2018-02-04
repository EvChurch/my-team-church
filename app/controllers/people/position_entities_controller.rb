# frozen_string_literal: true

class People::PositionEntitiesController < PeopleController
  before_action :load_person
  decorates_assigned :position_entity

  def show
    load_position_entity
  end

  protected

  def load_position_entity
    @position_entity ||= position_entity_scope.find(params[:position_entity_id] || params[:id])
  end

  def position_entity_scope
    @person.position_entities
  end
end
