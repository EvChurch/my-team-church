# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    user.has_role?(:admin, record)
  end

  def show?
    scope.find(record.id)
  rescue ActiveRecord::RecordNotFound
    false
  end

  def create?
    user.admin?
  end

  def new?
    create?
  end

  def update?
    user.has_role?(:admin, record)
  end

  def edit?
    update?
  end

  def destroy?
    user.admin?
  end

  def scope
    Pundit.policy_scope!(user, default_scope || record.class)
  end

  def default_scope
    return unless record.respond_to?(:organization) && record.organization.respond_to?(record.class.table_name)

    record.organization.send(record.class.table_name)
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope
    end
  end
end
