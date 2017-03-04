class Event
  include DataMapper::Resource

  property :id, 					 Serial
  property :title, 			   String,   :length => 255
  property :address, 		   String,   :length => 255
  property :lat, 				   Float   
  property :lng, 				   Float
  property :start_date,		 DateTime 
	property :finish_date,   DateTime 
  property :description,   String,   :length => 255
	property :all_day,		   Boolean 
  property :created_at,    DateTime
  property :created_on,    Date   
  property :updated_at,    DateTime
  property :updated_on,    Date

  has n, :attendees
  has n, :owns
  has n, :sections
  has n, :comments
  has n, :users, :through => :owns
  has n, :users, :through => :attendees
  has n, :widgets, :through => :sections
  has n, :users, :through => :comments

end