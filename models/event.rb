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

  belongs_to :user
  has n, :attendees
  has n, :users, :through => :attendees
  has n, :sections
  has n, :widgets, :through => :sections
  has n, :comments
  has n, :users, :through => :comments

end