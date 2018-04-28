# frozen_string_literal: true

class ResourceFinderService
  def self.find(organization, resource_id, resource_type, includes = [])
    resources = organization.send(resource_type.underscore.pluralize)
    resources = resources.includes(includes) unless includes.empty?
    resources.find(resource_id)
  end
end
