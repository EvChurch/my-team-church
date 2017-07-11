class Objective < ApplicationRecord
  belongs_to :resource, polymorphic: true
  has_many :child_links, class_name: 'Objective::Link', foreign_key: :parent_id
  has_many :children, class_name: 'Objective', through: :child_links
  has_many :parent_links, class_name: 'Objective::Link', foreign_key: :child_id
  has_many :parents, class_name: 'Objective', through: :parent_links
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
