class ApplicationPolicy
  attr_reader :user, :person, :record

  def initialize(user, record)
    @user = user
    @person = user.person
    @record = record
  end

  def index?
    false
  end

  def show?
    scope.find(record.id)
  rescue ActiveRecord::RecordNotFound
    false
  end

  def create?
    person.admin?
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
    person.admin?
  end

  def scope
    Pundit.policy_scope!(user, record.class)
  end

  class Scope
    attr_reader :user, :person, :scope

    def initialize(user, scope)
      @user = user
      @person = user.person
      @scope = scope
    end

    def resolve
      scope
    end
  end
end
