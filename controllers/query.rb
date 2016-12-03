class QueryController < Sinatra::Base
	enable :method_override

	before do
		content_type :json

		model_object = Object.const_get('User')
		# Security.new(:model => model_object).validate request do |valid|
		# 	error 401 unless valid	
		# end 
		
		@security = Security.new(:model => model_object) 
	end

	helpers do
		def api_request
			body = nil
			unless request.request_method == 'GET'
				request.body.rewind
				body = JSON.parse(request.body.read)
			end
			{:request => request, :params => params, :json_body => body}
		end

		def validate_request 
			yield request.media_type == 'application/json'
		end
		
		def model_name
			api_request[:params]["model"].capitalize
		end

		def valid_model?
			Object.const_defined? model_name
		end
	end

	get '/user/:id/attending' do 
		user_id = params[:id]
		events = Attendee.all(:user_id => user_id).events
		events.to_json
	end

end