class Section
	include DataMapper::Resource

	property :id, 				Serial
	property :name,  			Boolean
	property :icon_url,		String, :length => 255
	property :enabled,		Boolean
	property :created_at, DateTime
	property :created_on, Date   
	property :updated_at, DateTime
  property :updated_on, Date

	belongs_to :event

end