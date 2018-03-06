class ResourceFinderService
  def self.find(organization, resource_id, resource_type)
    organization.send(resource_type.underscore.pluralize).find(resource_id)
  end
end
