require 'sinatra/base'

module Sinatra
	module ApiRequestHelper

		def read_json
			unless request.request_method == 'GET'
				request.body.rewind
				@body = JSON.parse(@data.body.read)
			end
		end

		def api_request request, paramas
			read_json
			{:request => request, :params => params, :json_body => @body}
		end

		def is_valid_media_type?
			request.media_type == 'application/json'
		end

		def is_valid_json?
			unless request.request_method == 'GET'
			  begin
			    @body = JSON.parse(@data.body.read)
			    return true
			  rescue JSON::ParserError => e
			    return false
			  end
			end
		end

		def request_validate 
			yield is_valid_media_type?
		end

	end

	helpers ApiRequestHelper
end