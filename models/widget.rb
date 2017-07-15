class Widget
	include DataMapper::Resource

	property :id, 				Serial
	property :type,  			String, :length => 255
	property :icon_url,		String, :length => 255
	property :enabled,		Boolean
	property :created_at, DateTime
	property :created_on, Date   
	property :updated_at, DateTime
  property :updated_on, Date

	has n, :sections
	has n, :events, :through => :sections

end