class UsersController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
		#error 400 unless valid_request?
	end

	helpers do
		def user_id
			api_request[:params][:id]
		end
	end

	# USER MODEL CRUD

	# Get all users records
	get '/' do
		users ||= User.all() || halt(api_error 1001)
		users.to_json
	end

	# Get specific user
	get '/:id' do
		user ||= User.get(user_id) || halt(api_error 1001)
		user.to_json(:methods=> [:account])
	end

	# Create new user record
	post '/' do
		attributes = {
			:email => api_request[:json_body]["email"],
			:password => api_request[:json_body]["password"],
			:token => api_request[:json_body]["token"]
		}
		user = user.new
		user.attributes = attributes
		halt(api_error 1002) unless user.save
		user.to_json
	end

	# Update existing user record
	put '/:id' do 
		attributes = {
			:email => api_request[:json_body]["email"],
			:password => api_request[:json_body]["password"],
			:token => api_request[:json_body]["token"]
		}
		user ||= User.get(user_id) || halt(api_error 1001)
		user.attributes = attributes
		halt(api_error 1003) unless user.save
		user.to_json
	end

	# Delete user record
	delete '/:id' do
		user ||= User.get(user_id) || halt(api_error 1001)
		user.destroy
	end

	# USERS ACCOUNT

	# Get user account 
	# Fetch account as child of user
	get '/:id/account' do
		user ||= User.get(user_id) || halt(api_error 1001)
		user.account.to_json
	end

	# Create account that belongs to user
	post '/:id/account' do
		attributes = {
			:name => api_request[:json_body]["name"],
			:email => api_request[:json_body]["email"]
		}
		user = User.get(user_id) || halt(api_error 1001)
		account = user.account.new
		account.attributes = attributes
		halt(api_error 1002) unless account.save
		account.to_json
	end

	# EVENTS CREATED BY USER

	# Get all user events records
	get '/:id/events' do
		user ||= User.get(user_id) || halt(api_error 1001)
		events ||= user.owns.all().event || halt(api_error 1001) 
		events.to_json
	end

	# Get specific user event record
	get '/:id/events/:event_id' do
		event_id = api_request[:params][:event_id]
		user ||= User.get(user_id) || halt(api_error 1001) 
		events ||= user.events.get(event_id) || halt(api_error 1001)
		events.to_json
	end

	# Create event record for a user
	post '/:id/events' do 
		sections = api_request[:json_body]["sections"]
		user ||= User.get(user_id) || halt(api_error 1001)
		user_owns = user.owns.new
		attributes = {
			:title => api_request[:json_body]["title"],
  		:address => api_request[:json_body]["address"],
  		:lat => api_request[:json_body]["lat"],
  		:lng => api_request[:json_body]["lng"],
  		:start_date => api_request[:json_body]["start_date"],
			:finish_date => api_request[:json_body]["finish_date"],
  		:description => api_request[:json_body]["description"]
		}
  	event = Event.new 
		event.attributes = attributes
		user_owns.event = event
		user_owns.save

		sections.each do |section|  
			widget_type = section["type"]
			widget = Widget.first_or_create(:type => widget_type)
			widget.enabled = true
			new_section = event.sections.new
			new_section.enabled = true
			new_section.widget = widget
			halt(api_error 1002) unless new_section.save
		end
		halt(api_error 1002) unless event.save
		event.to_json
	end

	# COMMENTS CREATED BY THE USER

	# Get all comment records by user
	get '/:id/comments' do
		user ||= User.get(user_id) || halt(api_error 1001)
		comments ||= user.comments.all() || halt(api_error 1001)
		comments.to_json
	end

	# Get specific comment record by user
	get '/:id/comments/:comment_id' do 
		comment_id = api_request[:params][:comment_id]
		user ||= User.get(user_id) || halt(api_error 1001)
		comment ||= user.comments.get(comment_id) || halt(api_error 1001)
		comment.to_json
	end

	# EVENTS ATTENDING BY USER

	# Get all events records that are attending by user
	get '/:id/attendees' do
		user ||= User.get(user_id) || halt(api_error 1001)
		attending_events ||= user.attendees.all().event || halt(api_error 1001)
		attending_events.to_json
	end

	# Get specific event record that is attending by user
	get '/:id/attendees/:attendee_id' do
		attendee_id = api_request[:params][:attendee_id]
		user ||= User.get(user_id) || halt(api_error 1001)
		event ||= user.attendees.get(attendee_id).event || halt(api_error 1001)
		event.to_json
	end

end