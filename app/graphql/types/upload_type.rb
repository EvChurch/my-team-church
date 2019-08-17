# frozen_string_literal: true

Types::UploadType = GraphQL::ObjectType.define do
  name 'Upload'
  description 'Represents direct upload credentials'
  field :url, !types.String
  field :headers, !types.String
  field :blob_id, !types.String
  field :signed_blob_id, !types.String
end
