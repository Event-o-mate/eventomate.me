class AccountsController < Sinatra::Base
	enable :method_override
	helpers Sinatra::ApiRequest

	before do
		content_type :json
	end

	helpers do
		def account_id 
			api_request[:params][:id]
		end
	end

	get '/' do
		accounts ||= Account.all().to_json || halt(api_error 1001)
		accounts.to_json
	end

	get '/:id' do
		account ||= Account.get(account_id) || halt(api_error 1001)
		account.to_json
	end

	post '/' do 
		user || = User.get(user_id) || halt(api_error 1001)
		attributes = [
			:name => api_request[:json_body]["name"]
			:email => api_request[:json_body]["email"]
		]
		account = user.accounts.new
		account.attributes = attributes
		halt(api_error 1002) unless account.save
		account.to_json
	end

	put '/:id' do
		attributes = [
			:name => api_request[:json_body]["name"]
			:email => api_request[:json_body]["email"]
		]
		account ||= Account.get(account_id) || halt(api_error 1001)
		account.attributes = attributes
		halt(api_error 1003) unless account.save
		account.to_json
	end

	delete '/:id' do
		account ||= Account.get(account_id) || halt(api_error 1001)
		account.destroy()
	end
end