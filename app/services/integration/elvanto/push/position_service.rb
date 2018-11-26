class Integration::Elvanto::Push::PositionService
  def self.push(integration, position, action)
    Integration::Elvanto::Push::DepartmentService.push(integration, position.department, 'update')
  end
end