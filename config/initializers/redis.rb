require 'redis'
require 'redis/objects'
require 'redis/namespace'

redis_config = YAML.safe_load(ERB.new(File.read(Rails.root.join('config', 'redis.yml').to_s)).result)
host, port = redis_config[Rails.env].split(':')
Redis.current = Redis::Namespace.new("MyPlace:#{Rails.env}", redis: Redis.new(host: host, port: port))
MyPlace::Application.configure do
  config.peek.adapter = :redis, {
    client: Redis.current,
    expires_in: 60 * 30 # => 30 minutes in seconds
  }
end
