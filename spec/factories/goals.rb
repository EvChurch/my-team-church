FactoryGirl.define do
  factory :goal do
    resouce_id ''
    resource_type 'MyString'
    title 'MyString'
    description 'MyText'
    estimated_completion '2017-05-22'
    kind 1
    amount_kind 1
    amount '9.99'
  end
end
