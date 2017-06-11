class User
  class Option < ActiveRecord::Base
    belongs_to :user
    validates :user, presence: true
    validates :key, presence: true, uniqueness: { scope: :user_id }
  end
end
