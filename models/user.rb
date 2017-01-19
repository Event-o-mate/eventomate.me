class User
  include DataMapper::Resource

  property :id, 					 Serial
  property :email, 				 String,   :length => 255
  property :password, 		 String,   :length => 255
  property :token, 				 String,   :length => 255
  property :recover_code,  String,   :length => 255
  property :created_on, DateTime

  has 1, :account
  has n, :attendees
  has n, :events, :through => :attendees
  has n, :comments
  has n, :events, :through => :comments
  
end