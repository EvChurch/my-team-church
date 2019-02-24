namespace :integration do
  task pull: :environment do
    Integration.find_each do |integration|
      integration.active && integration.run_integration_pull_job
    end
  end
end
