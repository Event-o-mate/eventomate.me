class Attendee
	include DataMapper::Resource

	property :id, 				Serial
	property :user_id,		Integer	
	property :created_on,	DateTime

	belongs_to :event

end