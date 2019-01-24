class Instructor < ApplicationRecord
  has_many :dance_classes
  has_many :studios, through: :dance_classes
  validates :name, uniqueness: {case_sensitive: false}
end
