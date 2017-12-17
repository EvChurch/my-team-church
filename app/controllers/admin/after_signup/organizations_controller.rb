# frozen_string_literal: true

module Admin
  module AfterSignup
    class OrganizationsController < AfterSignupController
      def new
        build_organization
      end

      def create
        build_organization
        unless save_organization
          flash[:error] = @organization.errors.full_messages
          return render :new
        end
        current_user.add_role :admin, @organization
        current_user.add_role :member, @organization
        flash[:success] = 'Church Profile saved successfully'
        redirect_to after_signup_index_path
      end

      protected

      def build_organization
        @organization ||= organization_scope.new
        @organization.attributes = organization_params
        @organization.integrations.first_or_initialize(type: 'Integration::Elvanto')
      end

      def save_organization
        @organization.save
      end

      def organization_params
        organization_params = params[:organization]
        return {} unless organization_params
        params.require(:organization).permit(:name, :subdomain, :address_1, :address_2,
                                             :city, :state, :zip, :country, :time_zone, :website_url,
                                             integrations_attributes: %i[id type client_id client_secret api_key])
      end
    end
  end
end
