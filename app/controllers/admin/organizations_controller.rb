# frozen_string_literal: true

module Admin
  class OrganizationsController < AdminController
    def edit
      build_organization
    end

    def update
      build_organization
      unless save_organization
        flash[:error] = @organization.errors.full_messages
        return render :edit, status: :bad_request
      end
      return render nothing: true if request.xhr?
      flash[:success] = 'Church Profile saved successfully'
      redirect_to action: :edit
    end

    def select
      @organization = organization_scope.find(params[:id])
      session[:organization_id] = @organization.id
      redirect_to :dashboard_root
    end

    def export
      render xlsx: 'export',
             filename: "#{organization.name.gsub!(/( )/, '_').downcase}_#{Time.zone.today.to_s(:iso8601)}.xlsx"
    end

    protected

    def build_organization
      @organization.attributes = organization_params
      @organization.integrations.first_or_initialize(type: 'Integration::Elvanto')
    end

    def save_organization
      @organization.save
    end

    def organization_params
      return {} unless params[:organization]
      params.require(:organization).permit(:name, :address_1, :address_2,
                                           :city, :state, :zip, :country, :time_zone, :website_url,
                                           integrations_attributes: %i[id type client_id client_secret api_key])
    end
  end
end
