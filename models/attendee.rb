class Attendee
	include DataMapper::Resource

	property :id, 					 Serial
	property :created_on,		 DateTime 

end