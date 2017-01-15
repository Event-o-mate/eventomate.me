class Comment 
	include DataMapper::Resource

	property :id, Serial
	property :user_id, Integer
	property :conent, String, :length => 50000
	property :created_at, DateTime
	property :created_on, Date   
	property :updated_at, DateTime
  property :updated_on, Date

  belongs_to :event

end