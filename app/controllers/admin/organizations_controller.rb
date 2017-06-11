module Admin
  class OrganizationsController < AdminController
    def edit
      authorize @organization
    end

    def update
      authorize @organization
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
      authorize @organization
      session[:organization_id] = @organization.id
      redirect_to :dashboard_root
    end

    protected

    def build_organization
      @organization.attributes = organization_params
    end

    def save_organization
      @organization.save
    end

    def organization_params
      return {} unless params[:organization]
      params.require(:organization).permit(:name, :address_1, :address_2,
                                           :city, :state, :zip, :country, :time_zone, :website_url,
                                           :has_finances, :has_event_registrations, :has_reviews,
                                           :has_directories, :has_documents, :has_statistics,
                                           :directory_url, :statistics_url, :events_url, :mpd_url, :mpdx_url,
                                           :has_mpd, :has_mpdx, :has_leave, :leave_url)
    end
  end
end
