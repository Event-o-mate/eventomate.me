class CommentsController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
	end

	helpers do 
		def comment_id
			api_request[:params][:id]
		end

	get '/' do
		comment ||= Comment.all() || halt(api_request 1001)
		comment.to_json
	end

	
	get '/:id' do
		comment ||= Comment.get(comment_id) || halt(api_request 1001)
		comment.to_json
	end

	post '/' do
		event_id = api_request[:json_body]["event_id"]
		user_id = api_request[:json_body]["user_id"]
		event ||= Event.get(event_id) || halt(api_request 1001)
		user ||= User.get(user_id) || halt(api_request 1001)
		attributes = [
			:content =>  api_request[:json_body]["content"],
			:user => user
		]
		comment = event.comments.new
		comment.attributes = attributes
		halt(api_request 1002) unless comment.save
		comment.to_json
	end

	put '/:id' do
		user_id = api_request[:json_body]["user_id"]
		user ||= User.get(user_id) || halt(api_request 1001)
		comment ||= Comment.get(comment_id) || halt(api_request 1001)
		attributes = [
			:content => api_request[:json_body]["content"],
			:user => user
		]
		halt(api_request 1003) unless comment.save
		comment.to_json
	end

	delete '/:id' do
		comment ||= Comment.get(comment_id) || halt(api_request 1001)
		comment.destroy()
	end

end