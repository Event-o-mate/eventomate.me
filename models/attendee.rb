class Attendee
	include DataMapper::Resource

	property :id, 				Serial
	propert  :user_id			Integer	
	property :created_on,	DateTime

	has n, :events

end