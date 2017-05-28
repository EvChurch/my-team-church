Rails.application.routes.draw do
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  constraints(Domain) do
    scope module: :dashboard do
      resources :people
      resources :departments, only: %i[index show] do
        scope module: :departments do
          resources :sub_departments, only: :show do
            scope module: :sub_departments do
              resources :positions, only: :show
            end
          end
        end
      end
      resources :goals do
        get 'resources', on: :collection
      end
    end
    root to: 'dashboard#index'
  end
  root to: 'visitors#index'
end
