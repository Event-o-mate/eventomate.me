class Event
  include DataMapper::Resource

  property :id, 					 Serial
  property :name, 			   String,   :length => 255
  property :address, 		   String,   :length => 255
  property :lat, 				   Float   
  property :lng, 				   Float
  property :start_date,		 DateTime 
	property :finish_date,   DateTime 
	property :all_day,		   Boolean 
  property :created_on,		 DateTime 

end