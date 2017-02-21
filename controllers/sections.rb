class SectionsController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
	end

	helpers do
		def section_id
			api_request[:params][:id]
		end
	end

	get '/' do
		sections ||= Section.all() || halt(api_error 1001)
		sections.to_json
	end

	get '/:id' do 
		section ||= Section.get(section_id) || halt(api_error 1001)
		section.to_json
	end

	post '/' do
		event_id = api_request[:json_body]["event_id"]
		widget_type = api_request[:json_body]["widget_type"]
		event ||= Event.get(event_id) || halt(api_error 1001)
		widget ||= first_or_create(:type => widget_type) || halt(api_error 1001)
		new_section = event.sections.new
		new_section.enabled = true
		new_section.widget = widget
		halt(api_error 1002) unless new_section.save
		new_section.to_json
	end

	put '/:id' do
		event_id = api_request[:json_body]["event_id"]
		widget_type = api_request[:json_body]["widget_type"]
		enabled = api_request[:json_body]["enabled"]
		event ||= Event.get(event_id) || halt(api_error 1001)
		widget ||= first_or_create(:type => widget_type) || halt(api_error 1001)
		section ||= Section.get(section_id) || halt(api_error 1001)
		attributes = [
			:event => event,
			:widget => widget,
			:enabled => true
		]
		halt(api_error 1003) unless section.save
		section.to_json
	end

	delete '/:id' do
		section ||= Section.get(section_id) || halt(api_error 1001)
		section.destroy()
	end

end