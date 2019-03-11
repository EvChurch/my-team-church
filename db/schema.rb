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

ActiveRecord::Schema.define(version: 2019_03_04_030723) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "department_leaders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "person_id"
    t.uuid "department_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["department_id"], name: "index_department_leaders_on_department_id"
    t.index ["discarded_at"], name: "index_department_leaders_on_discarded_at"
    t.index ["person_id", "department_id"], name: "index_department_leaders_on_person_id_and_department_id", unique: true
    t.index ["person_id"], name: "index_department_leaders_on_person_id"
  end

  create_table "departments", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "organization_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "remote_id"
    t.string "remote_source"
    t.string "ancestry"
    t.text "description"
    t.datetime "discarded_at"
    t.index ["ancestry"], name: "index_departments_on_ancestry"
    t.index ["discarded_at"], name: "index_departments_on_discarded_at"
    t.index ["organization_id", "remote_id", "remote_source"], name: "departments_remote_idx", unique: true
    t.index ["organization_id"], name: "index_departments_on_organization_id"
  end

  create_table "integrations", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "type"
    t.uuid "organization_id"
    t.string "client_id"
    t.string "client_secret"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "encrypted_password"
    t.string "encrypted_password_iv"
    t.string "encrypted_api_key"
    t.string "encrypted_api_key_iv"
    t.string "domain"
    t.boolean "pushable", default: false
    t.string "encrypted_api_refresh_key"
    t.string "encrypted_api_refresh_key_iv"
    t.datetime "expires_at"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_integrations_on_discarded_at"
    t.index ["organization_id", "type"], name: "index_integrations_on_organization_id_and_type", unique: true
    t.index ["organization_id"], name: "index_integrations_on_organization_id"
  end

  create_table "objective_key_results", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "objective_id"
    t.string "name", null: false
    t.string "result_type", default: "%", null: false
    t.decimal "start_value", default: "0.0"
    t.decimal "target_value", default: "100.0"
    t.decimal "weight", default: "1.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "current_value", default: "0.0"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "discarded_at"
    t.string "kind", default: "key_result"
    t.index ["discarded_at"], name: "index_objective_key_results_on_discarded_at"
    t.index ["objective_id"], name: "index_objective_key_results_on_objective_id"
  end

  create_table "objectives", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "resource_id"
    t.string "resource_type"
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_objectives_on_discarded_at"
    t.index ["resource_type", "resource_id"], name: "index_objectives_on_resource_type_and_resource_id"
  end

  create_table "organizations", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.string "api_key"
    t.string "client_id"
    t.string "client_secret"
    t.string "primary_color"
    t.string "secondary_color"
    t.string "subdomain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "website_url"
    t.string "address_1"
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.string "time_zone"
    t.string "logo_file_name"
    t.string "logo_content_type"
    t.integer "logo_file_size"
    t.datetime "logo_updated_at"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_organizations_on_discarded_at"
    t.index ["subdomain"], name: "index_organizations_on_subdomain", unique: true
  end

  create_table "people", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "organization_id"
    t.datetime "date_added"
    t.datetime "date_modified"
    t.string "first_name"
    t.string "preferred_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.string "mobile"
    t.string "status"
    t.string "username"
    t.datetime "last_login"
    t.string "country"
    t.string "timezone"
    t.string "picture"
    t.string "family_relationship"
    t.uuid "category_id"
    t.boolean "admin"
    t.boolean "contact"
    t.boolean "archived"
    t.boolean "deceased"
    t.boolean "volunteer"
    t.uuid "family_id"
    t.date "anniversary"
    t.date "birthday"
    t.boolean "development_child"
    t.string "gender"
    t.string "giving_number"
    t.string "home_address"
    t.string "home_address2"
    t.string "home_city"
    t.string "home_country"
    t.string "home_postcode"
    t.string "home_state"
    t.string "mailing_address"
    t.string "mailing_address2"
    t.string "mailing_city"
    t.string "mailing_country"
    t.string "mailing_postcode"
    t.string "mailing_state"
    t.string "marital_status"
    t.string "receipt_name"
    t.string "reports_to"
    t.string "school_grade"
    t.string "security_code"
    t.boolean "special_needs_child"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "remote_id"
    t.string "remote_source"
    t.datetime "discarded_at"
    t.datetime "invited_at"
    t.index ["discarded_at"], name: "index_people_on_discarded_at"
    t.index ["organization_id", "remote_id", "remote_source"], name: "people_remote_idx", unique: true
    t.index ["organization_id"], name: "index_people_on_organization_id"
  end

  create_table "roles", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.uuid "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_roles_on_discarded_at"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "team_leader_assignees", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "leader_id"
    t.uuid "entity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entity_id"], name: "index_team_leader_assignees_on_entity_id"
    t.index ["leader_id"], name: "index_team_leader_assignees_on_leader_id"
  end

  create_table "team_leaders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "person_id"
    t.uuid "team_id"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["discarded_at"], name: "index_team_leaders_on_discarded_at"
    t.index ["person_id", "team_id"], name: "index_team_leaders_on_person_id_and_team_id", unique: true
    t.index ["person_id"], name: "index_team_leaders_on_person_id"
    t.index ["team_id"], name: "index_team_leaders_on_team_id"
  end

  create_table "team_links", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "team_id"
    t.uuid "department_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["department_id"], name: "index_team_links_on_department_id"
    t.index ["discarded_at"], name: "index_team_links_on_discarded_at"
    t.index ["team_id", "department_id"], name: "index_team_links_on_team_id_and_department_id", unique: true
    t.index ["team_id"], name: "index_team_links_on_team_id"
  end

  create_table "team_position_entities", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "position_id"
    t.uuid "person_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.boolean "trial", default: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_team_position_entities_on_discarded_at"
    t.index ["position_id", "person_id"], name: "index_team_position_entities_on_position_id_and_person_id", unique: true
    t.index ["position_id"], name: "index_team_position_entities_on_position_id"
  end

  create_table "team_position_items", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "ancestry"
    t.uuid "position_id"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["ancestry"], name: "index_team_position_items_on_ancestry"
    t.index ["discarded_at"], name: "index_team_position_items_on_discarded_at"
    t.index ["position_id"], name: "index_team_position_items_on_position_id"
  end

  create_table "team_positions", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "remote_id"
    t.string "remote_source"
    t.text "description"
    t.integer "people_needed", default: 0
    t.text "training_description"
    t.datetime "discarded_at"
    t.uuid "team_id"
    t.index ["discarded_at"], name: "index_team_positions_on_discarded_at"
    t.index ["team_id", "remote_id", "remote_source"], name: "team_positions_remote_idx", unique: true
  end

  create_table "teams", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "organization_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.text "description"
    t.string "remote_id"
    t.string "remote_source"
    t.index ["discarded_at"], name: "index_teams_on_discarded_at"
    t.index ["organization_id", "remote_id", "remote_source"], name: "teams_remote_idx", unique: true
    t.index ["organization_id"], name: "index_teams_on_organization_id"
  end

  create_table "user_links", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "person_id"
    t.uuid "organization_id"
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_user_links_on_discarded_at"
    t.index ["organization_id", "user_id"], name: "index_user_links_on_organization_id_and_user_id", unique: true
    t.index ["organization_id"], name: "index_user_links_on_organization_id"
    t.index ["person_id"], name: "index_user_links_on_person_id"
    t.index ["user_id"], name: "index_user_links_on_user_id"
  end

  create_table "user_options", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "key"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_user_options_on_discarded_at"
    t.index ["user_id", "key"], name: "index_user_options_on_user_id_and_key", unique: true
    t.index ["user_id"], name: "index_user_options_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "mobile"
    t.boolean "expires"
    t.datetime "expires_at"
    t.string "refresh_token"
    t.string "access_token"
    t.string "username"
    t.boolean "configured"
    t.string "time_zone"
    t.string "subdomain"
    t.string "token"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email", "subdomain"], name: "index_users_on_email_and_subdomain", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["token"], name: "index_users_on_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "role_id"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_users_roles_on_discarded_at"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "department_leaders", "departments", on_delete: :cascade
  add_foreign_key "department_leaders", "people", on_delete: :cascade
  add_foreign_key "departments", "organizations", on_delete: :cascade
  add_foreign_key "integrations", "organizations"
  add_foreign_key "objective_key_results", "objectives", on_delete: :cascade
  add_foreign_key "team_leader_assignees", "team_leaders", column: "leader_id", on_delete: :cascade
  add_foreign_key "team_leader_assignees", "team_position_entities", column: "entity_id", on_delete: :cascade
  add_foreign_key "team_leaders", "people"
  add_foreign_key "team_leaders", "teams"
  add_foreign_key "team_links", "departments", on_delete: :cascade
  add_foreign_key "team_links", "teams", on_delete: :cascade
  add_foreign_key "team_position_entities", "people", on_delete: :cascade
  add_foreign_key "team_position_entities", "team_positions", column: "position_id", on_delete: :cascade
  add_foreign_key "team_position_items", "team_positions", column: "position_id", on_delete: :cascade
  add_foreign_key "team_positions", "teams", on_delete: :cascade
  add_foreign_key "teams", "organizations", on_delete: :cascade
  add_foreign_key "user_links", "organizations", on_delete: :cascade
  add_foreign_key "user_links", "people", on_delete: :cascade
  add_foreign_key "user_links", "users", on_delete: :cascade
  add_foreign_key "user_options", "users", on_delete: :cascade
  add_foreign_key "users_roles", "roles", on_delete: :cascade
  add_foreign_key "users_roles", "users", on_delete: :cascade
end
