module ElvantoCollection
  extend ActiveSupport::Concern
  included do
    def self.create_collection_from_api(collection)
      names = name.underscore.split('/')
      names.each_with_index do |name, index|
        plural_name = name.pluralize
        collection = collection.map do |object|
          container_object = object[plural_name] == [] ? [] : object[plural_name][name]
          if container_object.empty?
            container_object
          else
            container_object.map do |parent_object|
              if names[index + 1].nil?
                parent_object
              else
                parent_object[names[index + 1].pluralize][names[index + 1]].map do |child_object|
                  child_object["#{name}_id"] = parent_object['id']
                end
                parent_object
              end
            end
          end
        end.flatten
      end
      collection.flatten.uniq { |object| object['id'] }.map do |object|
        container_object = where(id: object['id']).first_or_initialize
        container_object.attributes = object.select { |k, _v| container_object.attributes.keys.member?(k.to_s) }
        container_object.save
        container_object
      end
    end
  end
end
