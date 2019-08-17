# frozen_string_literal: true

InputTypes::UploadInputType = GraphQL::InputObjectType.define do
  name 'UploadInputType'
  description 'File information required to prepare a direct upload'

  argument :filename, !types.String do
    description 'Original file name'
  end

  argument :byte_size, !types.Int do
    description 'File size (bytes)'
  end

  argument :checksum, !types.String do
    description 'MD5 file checksum as base64'
  end

  argument :content_type, !types.String do
    description 'File content type'
  end
end
