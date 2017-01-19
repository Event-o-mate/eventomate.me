class CommentsController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
	end

	post '/add/:event_id' do
		event_id = api_request[:params][:event_id]
		widget_type = "comments"
		
		widget = Widget.first_or_create(:name => widget_type)
		new_section = Event.get(event_id).sections.new
		new_section.widget = widget
	end

	get '/' do
		Comment.all().to_json
	end

	get '/:event_id' do
		event_id = api_request[:params][:event_id]
		event = Event.get(event_id)
		event.comments.to_json
	end

	get '/:event_id/:id' do
		event_id = api_request[:params][:event_id]
		comment_id = api_request[:params][:id]
		event = Event.get(event_id)
		event.comments.get(comment_id).to_json
	end

	post '/:event_id/:user_id' do
		event_id = api_request[:params][:event_id]
		user_id = api_request[:params][:user_id]
		content = api_request[:json_body]["content"]
		event = Event.get(event_id)
		comment = event.comments.create(:content => content)
		comment.user = User.get(user_id)
		comment.save
	end

	put '/:id' do
		comment_id = api_request[:params][:id]
		comment = Comment.get(comment_id)
		comment.content = api_request[:json_body]["content"] 
		comment.save
		comment.to_json
	end

	delete '/:id' do
		comment_id = api_request[:params][:id]
		Comment.get(comment_id).destroy
	end

end