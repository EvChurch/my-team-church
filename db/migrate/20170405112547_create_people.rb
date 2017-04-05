class CreatePeople < ActiveRecord::Migration[5.0]
  def change
    create_table :people, id: :uuid do |t|
      t.timestamp :date_added
      t.timestamp :date_modified
      t.string :firstname
      t.string :preferred_name
      t.string :middle_name
      t.string :lastname
      t.string :email
      t.string :phone
      t.string :mobile
      t.string :status
      t.string :username
      t.timestamp :last_login
      t.string :country
      t.string :timezone
      t.string :picture
      t.string :family_relationship
      t.uuid :category_id
      t.boolean :admin
      t.boolean :contact
      t.boolean :archived
      t.boolean :deceased
      t.boolean :volunteer
      t.string :family
      t.uuid :family_id
      t.date :anniversary
      t.date :birthday
      t.boolean :development_child
      t.string :gender
      t.string :giving_number
      t.string :home_address
      t.string :home_address2
      t.string :home_city
      t.string :home_country
      t.string :home_postcode
      t.string :home_state
      t.string :mailing_address
      t.string :mailing_address2
      t.string :mailing_city
      t.string :mailing_country
      t.string :mailing_postcode
      t.string :mailing_state
      t.string :marital_status
      t.string :receipt_name
      t.string :reports_to
      t.string :school_grade
      t.string :security_code
      t.boolean :special_needs_child

      t.timestamps
    end
  end
end
