# frozen_string_literal: true

Types::AttachmentType = GraphQL::ObjectType.define do
  name 'Attachment'
  field :id, !types.ID
  field :url, !types.String
end
