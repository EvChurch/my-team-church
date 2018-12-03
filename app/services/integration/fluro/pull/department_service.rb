# frozen_string_literal: true

class Integration::Fluro::Pull::DepartmentService < Integration::Fluro::Pull::BaseService
  LOCAL_COLLECTION = 'departments'
  COLLECTION = 'realm/tree'

  protected

  def import_record(department, parent: nil)
    local_department = organization.departments.find_or_initialize_by(
      remote_id: department['_id'], remote_source: 'fluro'
    )
    local_department.name = department['title']
    local_department.parent = parent
    local_department.pushable = false
    local_department.save!
    department['children'].each do |child|
      import_record(child, parent: local_department)
    end
    local_department
  end
end
