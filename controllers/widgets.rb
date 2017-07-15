class WidgetsController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
	end

	helpers do 
		def widget_id
			api_request[:params][:id]
		end

		def widget_type 
			api_request[:json_body]["type"]
		end
	end

	get '/' do 
		widgets ||= Widget.all() || halt(api_error 1001)
		widgets.to_json
	end 

	get '/:id' do
		widget ||= Widget.get(widget_id) || halt(api_error 1001)
		widget.to_json
	end 

	post '/' do
		attributes = [
			:type => widget_type
		]
		widget = Widget.new
		widget.attributes = attributes
		halt(api_error 1001) unless widget.save
		widget.to_json
	end

	put '/:id' do 
		widget ||= Widget.get(widget_id) || halt(api_error 1001)
		attributes = [
			:type => widget_type
		]
		widget.attributes = attributes
		halt(api_error 1003) unless widget.save
		widget.to_json
	end
end