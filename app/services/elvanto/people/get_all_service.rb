require 'elvanto'

module Elvanto
  module People
    class GetAllService
      ADDITIONAL_FIELDS =
        %w[gender birthday anniversary school_grade marital_status development_child special_needs_child
           security_code receipt_name giving_number mailing_address mailing_address2 mailing_city mailing_state
           mailing_postcode mailing_country home_address home_address2 home_city home_state home_postcode
           home_country access_permissions departments service_types demographics locations family reports_to].freeze

      def self.perform
        User.all.map do |user|
          ElvantoAPI.configure(access_token: user.access_token)
          fetch_people
        end.flatten
      end

      def self.fetch_people
        request = ElvantoAPI.call('people/getAll', page_size: 1000, fields: ADDITIONAL_FIELDS)
        people = request['people']['person']
        return people unless request['people']['total'] > 1000
        pages = (request['people']['total'] + 500).round(-3) / 1000
        (2..pages).each do |page|
          request = ElvantoAPI.call('people/getAll', page_size: 1000, page: page, fields: ADDITIONAL_FIELDS)
          people += request['people']['person']
        end
        AccessPermission.create_collection_from_api(people)
        Demographic.create_collection_from_api(people)
        Department.create_collection_from_api(people)
        Department::SubDepartment.create_collection_from_api(people)
        Department::SubDepartment::Position.create_collection_from_api(people)
        Location.create_collection_from_api(people)
        ServiceType.create_collection_from_api(people)
        Person.create_collection_from_api(people)
      end
    end
  end
end
