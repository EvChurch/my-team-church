# Be sure to restart your server when you modify this file.
Rails.config.cache_store = :redis_store, ENV.fetch('REDIS_URL')
Rails.config.session_store :redis_store,
                           redis_server: ENV.fetch('REDIS_URL'),
                           domain: ".#{ENV.fetch('DOMAIN_NAME')}",
                           expires_in: 2.days,
                           serializer: :hybrid,
                           key: 'my_place_session_id'
