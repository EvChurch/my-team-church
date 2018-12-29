# frozen_string_literal: true

class Integration::Elvanto::Push::Team::Position::EntityService
  def self.push(integration, entity, _action)
    Integration::Elvanto::Push::PersonService.push(integration, entity.person, 'update')
  end
end