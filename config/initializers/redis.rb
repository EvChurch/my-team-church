# frozen_string_literal: true

require 'redis'
require 'redis/objects'
require 'redis/namespace'

Redis.current = Redis.new(url: ENV.fetch('REDIS_URL'))
MyPlace::Application.configure do
  config.peek.adapter = :redis, {
    client: Redis.current,
    expires_in: 60 * 30 # => 30 minutes in seconds
  }
end
