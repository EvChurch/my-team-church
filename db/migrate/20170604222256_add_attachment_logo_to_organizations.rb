# frozen_string_literal: true

class AddAttachmentLogoToOrganizations < ActiveRecord::Migration[5.0]
  def self.up
    change_table :organizations do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :organizations, :logo
  end
end
