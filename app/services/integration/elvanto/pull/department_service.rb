# frozen_string_literal: true

class Integration::Elvanto::Pull::DepartmentService < Integration::Elvanto::Pull::BaseService
  LOCAL_COLLECTION = COLLECTION = 'departments'

  protected

  def import_record(department, parent: nil)
    local_department = organization.departments.find_or_initialize_by(
      remote_id: department['id'], remote_source: 'elvanto'
    )
    local_department.name = department['title'] || department['name']
    local_department.parent = parent
    local_department.save!
    import_associations(department)
    local_department
  end

  def import_associations(department)
    department['sub_departments']&.each do |sub_department|
      import_record(sub_department, parent: local_department)
    end
    department['positions'].each do |position|
      import_position(position, parent: local_department)
    end
  end

  def import_position(position, parent:)
    local_position = parent.positions.find_or_initialize_by(
      remote_id: position['id'], remote_source: 'elvanto', organization_id: organization.id
    )
    local_position.name = position['name']
    local_position.save!
    local_position
  end
end
