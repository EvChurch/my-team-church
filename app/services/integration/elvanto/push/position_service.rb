# frozen_string_literal: true

class Integration::Elvanto::Push::PositionService
  def self.push(integration, position, _action)
    Integration::Elvanto::Push::TeamService.push(integration, position.team, 'update')
  end
end