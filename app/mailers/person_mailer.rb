# frozen_string_literal: true

class PersonMailer < ApplicationMailer
  def invite(user, person)
    @user         = user.decorate
    @person       = person.decorate
    @organization = person.organization

    mail(
      to: @person.email,
      subject: "#{@user.first_name} has invited you to join them on My Team @ Church"
    )
  end
end
