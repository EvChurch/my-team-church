# frozen_string_literal: true

require 'omniauth-oauth2'

module OmniAuth
  module Strategies
    class Elvanto < OmniAuth::Strategies::OAuth2
      AVAILABLE_SCOPES =
        %w[ManagePeople ManageGroups ManageServices ManageSongs
           ManageCalendar ManageFinancials AdministerAccount].freeze
      DEFAULT_SCOPES = %w[AdministerAccount].freeze
      REQUIRED_SCOPES = %w[ManagePeople].freeze

      option :name, :elvanto

      option :client_options, site: 'https://api.elvanto.com/',
                              authorize_url: '/oauth'

      uid { raw_info['id'] }

      info do
        {
          first_name: raw_info['firstname'],
          last_name: raw_info['lastname'],
          email: raw_info['email'],
          phone: raw_info['phone'],
          mobile: raw_info['mobile'],
          username: raw_info['username']
        }
      end

      def authorize_params
        super.tap do |params|
          params[:type] = 'web_server'

          scope_list = params[:scope].try(:split, ',') || DEFAULT_SCOPES
          scope_list += REQUIRED_SCOPES
          scope_list.select do |scope|
            AVAILABLE_SCOPES.include? scope
          end
          params[:scope] = scope_list.join(',')
        end
      end

      def raw_info
        @raw_info ||= JSON.parse(access_token.get('/v1/people/currentUser.json').body)['person'][0]
      end

      # https://github.com/intridea/omniauth-oauth2/issues/81
      def callback_url
        full_host + script_name + callback_path
      end
    end
  end
end
