# frozen_string_literal: true

class PersonMailer < ApplicationMailer
  def invite(user, person)
    @user         = user.decorate
    @person       = person.decorate
    @invite_url   = @person.invite_url
    @organization = @person.organization

    mail(
      to: @person.email,
      subject: "#{@user.first_name} has invited you to join them on MyTeam@Church"
    )
  end
end
