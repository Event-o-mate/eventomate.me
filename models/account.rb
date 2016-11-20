class Account 
	include DataMapper::Resource

	property :id, 					 Serial
  property :name, 			   String,   :length => 255
  property :email, 		   	 String,   :length => 255
  property :created_on,		 DateTime 

  belongs_to :user
end