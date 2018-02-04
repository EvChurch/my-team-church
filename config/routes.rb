# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users

  constraints subdomain: 'api' do
    resources :queries, via: %i[post options]
  end

  constraints subdomain: 'app' do
    match '*path', to: 'app#index', via: :get
    root to: 'app#index', as: :admin_root
  end

  root to: 'visitors#index'
end
