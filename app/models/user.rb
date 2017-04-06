class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:elvanto]
  enum role: %i[user vip admin]
  after_initialize :set_default_role, if: :new_record?
  has_one :person, foreign_key: :username, primary_key: :username

  def set_default_role
    self.role ||= User.count.zero? ? :admin : :user
  end
end
