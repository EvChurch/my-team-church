# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end
ruby '2.4.3'
gem 'ancestry'
gem 'axlsx', '2.1.0.pre'
gem 'axlsx_rails'
gem 'breadcrumbs_on_rails'
gem 'chosen-rails'
gem 'cocoon'
gem 'coffee-rails', '~> 4.2'
gem 'country_select'
gem 'domainatrix'
gem 'font-awesome-sass', '~> 4.7.0'
gem 'graphql'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails'
gem 'page_meta'
gem 'paperclip'
gem 'peek'
gem 'peek-gc'
gem 'peek-git'
gem 'peek-performance_bar'
gem 'peek-pg'
gem 'peek-rblineprof'
gem 'peek-redis'
gem 'puma', '~> 3.0'
gem 'rack-cors', require: 'rack/cors'
gem 'rails', '~> 5.1.2'
gem 'redis-namespace'
gem 'redis-objects', '~> 0.6.1'
gem 'redis-rails'
gem 'rolify'
gem 'rubyzip', '~> 1.1.0'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 2.0'
group :development, :test do
  gem 'byebug', platform: :mri
end
group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end
gem 'bootstrap', '~> 4.0.0'
gem 'devise'
gem 'draper', '3.0.0'
gem 'elvanto-api', github: 'ardation/api-ruby'
gem 'omniauth'
gem 'omniauth-oauth2'
gem 'pg'
gem 'pundit'
gem 'simple_form'
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'hub', require: false
  gem 'rails-erd', require: false
  gem 'rails_layout'
  gem 'rb-fchange', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-inotify', require: false
  gem 'spring-commands-rspec'
end
group :development, :test do
  gem 'dotenv-rails'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'foreman'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
  gem 'rubocop'
end
group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
end

gem 'graphiql-rails', group: :development
