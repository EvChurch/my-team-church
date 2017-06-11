class OrganizationDecorator < ApplicationDecorator
  decorates_association :teams
  decorates_association :department_imports

  delegate :count, to: :users, prefix: true

  def unacknowledged_department_imports
    @department_imports ||= object.department_imports.where(acknowledged: false).decorate
    @department_imports.each { |import| import.update_status unless import.complete? }
    @department_imports
  end

  def unacknowledged_account_imports
    @account_imports ||= object.account_imports.where(acknowledged: false).decorate
    @account_imports.each { |import| import.update_status unless import.complete? }
    @account_imports
  end

  def unacknowledged_entry_imports
    @entry_imports ||= object.entry_imports.where(acknowledged: false).decorate
    @entry_imports.each { |import| import.update_status unless import.complete? }
    @entry_imports
  end

  def unacknowledged_advance_imports
    @advance_imports ||= object.advance_imports.where(acknowledged: false).decorate
    @advance_imports.each { |import| import.update_status unless import.complete? }
    @advance_imports
  end

  def admins_count
    users(:admin).count
  end

  def pendings_count
    users(:pending).count
  end

  def members_count
    users(:member).count
  end

  def parents
    @folders ||= folders.order(:names_depth_cache).map { |folder| ['-' * folder.depth + folder.name, folder.id] }
  end

  def staff_url
    "http://#{subdomain}.#{ENV['DOMAIN_NAME']}#{ENV['STAFF_SITE_PORT']}/"
  end
end
