class Goal < ApplicationRecord
  belongs_to :resource, polymorphic: true
  validates :name, :resource_type, :resource_id, :kind, presence: true
  validates :amount, :amount_kind, presence: true, if: :objective?
  enum kind: %i[objective value]
  enum amount_kind: %i[number percentage money]

  RESOURCE_TYPES = {
    'Person' => 'Person',
    'Department' => 'Department',
    'Sub Department' => 'SubDepartment',
    'Position' => 'Position'
  }.freeze
end
