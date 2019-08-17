# frozen_string_literal: true

module Mutations::UploadMutation
  Create = GraphQL::Field.define do
    description 'Create Upload'
    argument :upload, !InputTypes::UploadInputType
    type Types::UploadType
    resolve lambda { |_organization, args, _ctx|
      binding.pry
      blob = ActiveStorage::Blob.create_before_direct_upload!(args.upload.to_h)
      {
        url: blob.service_url_for_direct_upload,
        headers: blob.service_headers_for_direct_upload.to_json,
        blob_id: blob.id,
        signed_blob_id: blob.signed_id
      }
    }
  end
end
