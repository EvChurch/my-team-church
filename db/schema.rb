# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170711122912) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "access_permission_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "access_permission_id"
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["access_permission_id"], name: "index_access_permission_entities_on_access_permission_id", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_access_permission_entities_on_resource", using: :btree
  end

  create_table "access_permissions", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_access_permissions_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_access_permissions_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "demographic_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "demographic_id"
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["demographic_id"], name: "index_demographic_entities_on_demographic_id", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_demographic_entities_on_resource_type_and_resource_id", using: :btree
  end

  create_table "demographics", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_demographics_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_demographics_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "departments", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_departments_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_departments_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "integrations", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "type"
    t.uuid     "organization_id"
    t.string   "client_id"
    t.string   "client_secret"
    t.string   "api_key"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organization_id", "type"], name: "index_integrations_on_organization_id_and_type", unique: true, using: :btree
  end

  create_table "location_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "location_id"
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["location_id"], name: "index_location_entities_on_location_id", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_location_entities_on_resource_type_and_resource_id", using: :btree
  end

  create_table "locations", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_locations_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_locations_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "objective_key_results", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "objective_id"
    t.string   "name",                           null: false
    t.text     "description",                    null: false
    t.string   "result_type",  default: "%",     null: false
    t.decimal  "start_value",  default: "0.0"
    t.decimal  "target_value", default: "100.0"
    t.decimal  "weight",       default: "1.0"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.index ["objective_id"], name: "index_objective_key_results_on_objective_id", using: :btree
  end

  create_table "objective_links", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "parent_id"
    t.uuid     "child_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["child_id"], name: "index_objective_links_on_child_id", using: :btree
    t.index ["parent_id", "child_id"], name: "index_objective_links_on_parent_id_and_child_id", unique: true, using: :btree
    t.index ["parent_id"], name: "index_objective_links_on_parent_id", using: :btree
  end

  create_table "objectives", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["resource_type", "resource_id"], name: "index_goals_on_resource_type_and_resource_id", using: :btree
  end

  create_table "organizations", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.string   "api_key"
    t.string   "client_id"
    t.string   "client_secret"
    t.string   "primary_color"
    t.string   "secondary_color"
    t.string   "subdomain"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "website_url"
    t.string   "address_1"
    t.string   "address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "country"
    t.string   "time_zone"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
    t.index ["subdomain"], name: "index_organizations_on_subdomain", unique: true, using: :btree
  end

  create_table "people", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.datetime "date_added"
    t.datetime "date_modified"
    t.string   "firstname"
    t.string   "preferred_name"
    t.string   "middle_name"
    t.string   "lastname"
    t.string   "email"
    t.string   "phone"
    t.string   "mobile"
    t.string   "status"
    t.string   "username"
    t.datetime "last_login"
    t.string   "country"
    t.string   "timezone"
    t.string   "picture"
    t.string   "family_relationship"
    t.uuid     "category_id"
    t.boolean  "admin"
    t.boolean  "contact"
    t.boolean  "archived"
    t.boolean  "deceased"
    t.boolean  "volunteer"
    t.string   "family"
    t.uuid     "family_id"
    t.date     "anniversary"
    t.date     "birthday"
    t.boolean  "development_child"
    t.string   "gender"
    t.string   "giving_number"
    t.string   "home_address"
    t.string   "home_address2"
    t.string   "home_city"
    t.string   "home_country"
    t.string   "home_postcode"
    t.string   "home_state"
    t.string   "mailing_address"
    t.string   "mailing_address2"
    t.string   "mailing_city"
    t.string   "mailing_country"
    t.string   "mailing_postcode"
    t.string   "mailing_state"
    t.string   "marital_status"
    t.string   "receipt_name"
    t.string   "reports_to"
    t.string   "school_grade"
    t.string   "security_code"
    t.boolean  "special_needs_child"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_people_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_people_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "position_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "position_id"
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["position_id"], name: "index_position_entities_on_position_id", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_position_entities_on_resource_type_and_resource_id", using: :btree
  end

  create_table "positions", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.uuid     "sub_department_id"
    t.string   "name"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_positions_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_positions_on_remote_id_and_remote_source", unique: true, using: :btree
    t.index ["sub_department_id"], name: "index_positions_on_sub_department_id", using: :btree
  end

  create_table "roles", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.string   "resource_type"
    t.uuid     "resource_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
    t.index ["name"], name: "index_roles_on_name", using: :btree
  end

  create_table "service_type_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "service_type_id"
    t.uuid     "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["resource_type", "resource_id"], name: "index_service_type_entities_on_resource_type_and_resource_id", using: :btree
    t.index ["service_type_id"], name: "index_service_type_entities_on_service_type_id", using: :btree
  end

  create_table "service_types", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["organization_id"], name: "index_service_types_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_service_types_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "sub_departments", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "organization_id"
    t.uuid     "department_id"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "remote_id"
    t.string   "remote_source"
    t.index ["department_id"], name: "index_sub_departments_on_department_id", using: :btree
    t.index ["organization_id"], name: "index_sub_departments_on_organization_id", using: :btree
    t.index ["remote_id", "remote_source"], name: "index_sub_departments_on_remote_id_and_remote_source", unique: true, using: :btree
  end

  create_table "user_options", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid     "user_id"
    t.string   "key"
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "key"], name: "index_user_options_on_user_id_and_key", unique: true, using: :btree
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "role"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.string   "mobile"
    t.boolean  "expires"
    t.datetime "expires_at"
    t.string   "refresh_token"
    t.string   "access_token"
    t.string   "username"
    t.boolean  "configured"
    t.string   "time_zone"
    t.string   "subdomain"
    t.index ["email", "subdomain"], name: "index_users_on_email_and_subdomain", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree
  end

  add_foreign_key "objective_key_results", "objectives"
  add_foreign_key "objective_links", "objectives", column: "child_id"
  add_foreign_key "objective_links", "objectives", column: "parent_id"
end
