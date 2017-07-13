# frozen_string_literal: true

class ChangeObjectivesToOkr < ActiveRecord::Migration[5.0]
  def change
    remove_column :objectives, :estimated_completion, :date
    remove_column :objectives, :kind, :integer
    remove_column :objectives, :amount_kind, :integer
    remove_column :objectives, :amount, :decimal
  end
end
