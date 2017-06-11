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
    person.admin?
  end

  def edit?
    update?
  end

  def destroy?
    person.admin?
  end

  def scope
    Pundit.policy_scope!(person, record.class)
  end

  class Scope
    attr_reader :person, :scope

    def initialize(user, scope)
      @person = if user.is_a?(Person)
                  user
                else
                  user.person
                end
      @scope = scope
    end

    def resolve
      scope
    end
  end
end
