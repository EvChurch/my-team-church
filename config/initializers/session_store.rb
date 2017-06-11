# Be sure to restart your server when you modify this file.
require Rails.root.join('config', 'initializers', 'redis').to_s

Rails.application.config.session_store :redis_store,
                                       servers: {
                                         host: Redis.current.client.host,
                                         port: Redis.current.client.port,
                                         db: 2,
                                         namespace: 'my_place:session:'
                                       },
                                       domain: ".#{ENV.fetch('DOMAIN_NAME')}",
                                       expires_in: 2.days,
                                       serializer: :hybrid,
                                       key: 'my_place_session_id'
