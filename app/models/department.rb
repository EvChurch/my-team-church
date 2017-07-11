class Department < ApplicationRecord
  belongs_to :organization
  has_many :sub_departments, dependent: :destroy
  has_many :positions, through: :sub_departments
  has_many :people, -> { uniq }, through: :positions
  has_many :objectives, as: :resource, dependent: :destroy

  validates :name, presence: true
end
