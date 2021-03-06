# frozen_string_literal: true

# Be sure to restart your server when you modify this file.
Rails.application.config.cache_store = :redis_store, ENV.fetch('REDIS_URL')
Rails.application.config.session_store :redis_store,
                                       redis_server: ENV.fetch('REDIS_URL'),
                                       domain: ".#{ENV.fetch('DOMAIN_NAME')}",
                                       expires_in: 2.days,
                                       serializer: :hybrid,
                                       key: 'my_team_session_id'
