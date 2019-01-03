# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end
ruby '2.5.3'
gem 'acts_as_list'
gem 'ancestry'
gem 'attr_encrypted', '~> 3.1'
gem 'bootsnap', require: false
gem 'bootstrap', '~> 4.1.1'
gem 'devise'
gem 'discard', '~> 1.0'
gem 'draper', '3.0.0'
gem 'elvanto-api', github: 'ardation/api-ruby'
gem 'graphql'
gem 'graphql-pundit'
gem 'graphql-errors'
gem 'httparty'
gem 'jbuilder', '~> 2.5'
gem 'nokogiri'
gem 'oj'
gem 'omniauth'
gem 'omniauth-oauth2'
gem 'paperclip'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'pundit'
gem 'rack-cors', require: 'rack/cors'
gem 'rails', '~> 5.2'
gem 'redis-rails'
gem 'rolify'
gem 'rollbar'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq'
gem 'simple_form'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 3'
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'hub', require: false
  gem 'listen', '~> 3.0.5'
  gem 'rails-erd', require: false
  gem 'rails_layout'
  gem 'rb-fchange', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-inotify', require: false
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
group :development, :test do
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'foreman'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
  gem 'rubocop'
end
group :test do
  gem 'database_cleaner'
end

gem 'graphiql-rails', group: :development
