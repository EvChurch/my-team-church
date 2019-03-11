# frozen_string_literal: true

class EnableUuidExtension < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'uuid-ossp' unless extensions.include?('uuid-ossp')
    enable_extension 'pgcrypto' unless extensions.include?('pgcrypto')
    enable_extension 'plpgsql' unless extensions.include?('plpgsql')
  end
end
