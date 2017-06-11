Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' } #, omniauth_callbacks: 'users/omniauth_callbacks' }
  constraints subdomain: 'admin' do
    root to: 'admin#index', as: :admin_root
    scope module: :admin do
      resources :users
      resource :organization, only: %i[edit update]
      resources :organizations, only: [] do
        post 'select', on: :member
      end
      resource :profile, only: [:edit, :update] do
        scope module: :profiles do
          resources :options, only: [:update]
        end
      end
      resources :after_signup, only: [:index] do
        collection do
          get 'finished'
          scope module: :after_signup do
            resource :profile,
                     only: %i[edit update],
                     as: :after_signup_profile
            resources :organizations,
                      only: %i[new create],
                      as: :after_signup_organizations
          end
        end
      end
    end
    root to: 'admin#index'
  end
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
