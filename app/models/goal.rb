class Goal < ApplicationRecord
  belongs_to :resource, polymorphic: true
  validates :name, :resource_type, :resource_id, presence: true
  enum kind: %i[objective value]
  enum amount_kind: %i[number percentage money]

  RESOURCE_TYPES = {
    'Person' => 'Person',
    'Department' => 'Department',
    'Sub Department' => 'Department::SubDepartment',
    'Position' => 'Department::SubDepartment::Position'
  }
end
