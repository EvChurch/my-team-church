# frozen_string_literal: true

require 'redis'

Redis.current = Redis.new(url: ENV.fetch('REDIS_URL'))
