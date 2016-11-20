class QueryController < Sinatra::Base
	enable :method_override

	before do
		content_type :json

		Request.validate request do |valid|
			error 400 unless valid
		end

		model_object = Object.const_get('User')
		# Security.new(:model => model_object).validate request do |valid|
		# 	error 401 unless valid	
		# end 
		
		@security = Security.new(:model => model_object) 
	end

	helpers do
		def api_request
			#Wrapping incoming request in custom object
			Request.new(:for => {:request => request, :params => params})
		end

		def model_name
			api_request.params["model"].capitalize
		end

		def valid_model?
			Object.const_defined? model_name
		end

		def security
			@security
		end
	end

	get '/my_events' do 
		token = security.parse_tokens api_request.env
		id = @model.first(:token => token).id
		unless user.nil? 
			Event.all(:user_id => id).to_json
		else

		end

	end

	get '/my_attending_events' do 
		token = security.parse_tokens api_request.env
		id = @model.first(:token => token).id
		Attendee.all(:user_id => id).to_json
	end

end