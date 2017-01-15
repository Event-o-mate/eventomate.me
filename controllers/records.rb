class RecordsController < Sinatra::Base
	enable :method_override

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

		def model
			Object.const_get(model_name)
		end

		def valid_model?
			Object.const_defined? model_name
		end
	end

	before do
		content_type :json

		# validate_request do |valid|
		# 	error 400 unless valid
		# end

		model_object = Object.const_get('User')
		# Security.new(:model => model_object).validate request do |valid|
		# 	error 401 unless valid	
		# end 
	end

	## 	EVENTOMATE SPECIFIC REQUESTS, FIXING API DESIGN

	# GET EVENTS
	get '/user/:id/event' do
		user_id = api_request[:params][:id]
		user = User.get(user_id)
		Response.for :get_record, api_request do |response|
			hosting_events = user.events.all
			response.data = hosting_events
			response.submit 
		end
	end

	# GET ATTENDEES
	get '/event/:id/attendee' do
		event_id = api_request[:params][:id]
		event = Event.get(event_id)
		attending = []
		Response.for :get_record, api_request do |response|
			event.attendees.each do |attendee|
				attending << User.get(attendee.user_id).account
			end
			response.data = attending
			response.submit
		end
	end

	# CREATE EVENT
	put '/user/:id/event' do 
		# parent_model_id = params[:id]
		user_id = api_request[:params][:id]
		user = User.get(user_id)
		Response.for :create_record, api_request do |response|
			# parent_model = Object.const_get(model_name).get(id)
			event = user.events.new
			event.attributes = api_request[:json_body]
			event.save
			
			if user.save	
				response.data = event
			else
				event.errors.each do |e| 
					puts e
				end

				response.error = Error.code 1002 #record not created, invalid data request, or sent data invalid
			end
			response.submit
		end
	end

	# RSVP EVENT
	# Needs to create new record in attendees table, containing user_id of the rsvping user
	put '/event/:id/attendee' do
		event_id = api_request[:params][:id]
		event = Event.get(event_id)
		Response.for :create_record, api_request do |response|
			attendee = event.attendees.create(:user_id => api_request[:json_body]["user_id"])
			if event.save
				response.data = attendee
			else
				response.error = Error.code 1002 #record not created, invalid data request, or sent data invalid 
			end
			response.submit
		end
	end

	## ORIGNAL API REQUESTS, ABASTRACT 

	#GET ALL RECORDS FOR MODEL
	get '/:model' do
		Response.for :all_records, api_request do |response|
			if valid_model?
				all_records = Object.const_get(model_name).all()
				unless all_records.nil?
					response.data = all_records	
				else
					response.error = Error.code 1001 #invalid data request, or data missing?
				end
			else
				response.error = Error.code 1008 #invalid model request
			end
			response.submit
		end
	end

	#GET RECORD FROM MODEL
	get '/:model/:id' do
		Response.for :get_record, api_request do |response|
			id = api_request[:params][:id]
			if valid_model?
				record = Object.const_get(model_name).get(id) 
				unless record.nil?
					response.data = record
				else
					response.error = Error.code 1001 #invalid data request, or data missing
				end
			else
				response.error = Error.code 1008 #invalid model request
			end
			response.submit
		end
	end

	#CREATE RECORD
	put '/:model' do
		Response.for :create_record, api_request do |response|
			if valid_model?
				new_record = Object.const_get(model_name).new 	
		 		new_record.attributes = api_request[:json_body]
				if new_record.save 
					response.data = new_record
				else
					response.error = Error.code 1002 #record not created, invalid data request, or sent data invalid 
				end
			else
				response.error = Error.code 1008 #invalid model request
			end
			response.submit
		end
	end

	#SAVE RECORD
	post '/:model/?:id?' do
		Response.for :save_record, api_request do |response|
			id = api_request.params[:id]
			if valid_model?
				if id.nil?
					record = Object.const_get(model_name).new
				else
					record = Object.const_get(model_name).get(id)
				end
				unless record.nil?
					record.attributes = api_request.for :update_record
					if record.save
						response.data = record
					else
						response.error = Error.code 1003 #record not saved, invalid data request, or sent data invalid
					end
				else
					response.error = Error.code 1001 #invalid data request, or data missing
				end
			else
				response.error = Error.code 1008 #invalid model request
			end
			response.submit
		end
	end
	
	#DELETE
	delete '/:model/:id' do
		Response.for :delete_record, api_request do |response|
			id = api_request.params[:id]
			if valid_model?
				record = Object.const_get(model_name).get(id)
				unless record.nil?
					if record.destroy
						response.data = {:deleted => true}
					else	
						response.error = Error.code 1004 #record not deletes, data missing, or invalid data request
					end
				else
					response.error = Error.code 1001 #invalid data request, or data missing
				end
			else
				response.error = Error.code 1008 #invalid model request
			end
			response.submit
		end
	end
end

