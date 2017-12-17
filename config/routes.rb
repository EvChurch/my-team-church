# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  require 'sidekiq/web'
  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  devise_for :users, controllers: { registrations: 'users/registrations' }
  constraints subdomain: 'admin' do
    scope module: :admin do
      #   resources :objectives
      #   resources :users
      #   resources :departments do
      #     scope module: :departments do
      #       resources :sub_departments, only: :show do
      #         scope module: :sub_departments do
      #           resources :positions, only: :show
      #         end
      #       end
      #     end
      #   end
      resource :organization, only: %i[edit update] do
        get 'export', on: :member
      end
      resources :organizations, only: [] do
        post 'select', on: :member
      end
      resource :profile, only: %i[edit update] do
        scope module: :profiles do
          resources :options, only: [:update]
        end
      end
      resources :after_signup, only: [:index] do
        collection do
          get 'finished'
          scope module: :after_signup do
            resource :user,
                     only: %i[edit update],
                     as: :after_signup_user
            resources :organizations,
                      only: %i[new create],
                      as: :after_signup_organizations
          end
        end
      end
    end
    match '*path', to: 'admin#index', via: :get
    root to: 'admin#index', as: :admin_root
  end
  constraints(Domain) do
    scope module: :people do
      resources :position_entities, only: :show do
        scope module: :position_entities do
          resources :objectives
        end
      end
    end
    root to: 'people#show'
  end
  root to: 'visitors#index'
end
