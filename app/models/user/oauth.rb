# frozen_string_literal: true

class User::Oauth < User
  def self.from_omniauth(auth)
    where(id: auth[:id])
      .first_or_initialize.assign_omniauth_attributes(auth)
  end

  def assign_omniauth_attributes(auth)
    assign_new_omniauth_attributes(auth[:info]) if new_record?
    assign_new_and_existing_omniauth_attributes(auth)
    save!
    self
  end

  private

  def assign_new_omniauth_attributes(info)
    assign_attributes(
      first_name: info[:first_name],
      last_name: info[:last_name],
      email: info[:email],
      phone: info[:phone],
      mobile: info[:mobile],
      username: info[:username],
      password: Devise.friendly_token[0, 20]
    )
  end

  def assign_new_and_existing_omniauth_attributes(auth)
    assign_attributes(
      username: auth[:info][:username],
      expires: auth[:credentials][:expires],
      expires_at: Time.strptime(auth[:credentials][:expires_at].to_s, '%s'),
      refresh_token: auth[:credentials][:refresh_token],
      access_token: auth[:credentials][:token]
    )
  end
end
