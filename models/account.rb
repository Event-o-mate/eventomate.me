class Account 

	property :id, 					 Serial
  property :name, 			   String,   :length => 255
  property :email, 		   	 String,   :length => 255
  property :created_on,		 DateTime 

end