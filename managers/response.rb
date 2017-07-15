class Response
	attr_accessor :data, :error
	
	def initialize args
		@request = args[:for]
		@type = args[:of]
		@content = {}
		@error = nil
		@data = nil
	end

	# Static Methods
	def self.for type, request
		response = new :for => request, :of => type
		yield response
	end

	def submit
		unless @error.nil?
			@content["errors"] = @error.get
		end
		send @type unless @type.nil?
		@content.to_json
	end

	#Authentication Controller
	def register 
		@content = @data if @error.nil?
	end
	
	def login
		@content = @data if @error.nil?
	end

	def change_password
		@content = @data if @error.nil?
	end
	
	def password_recovery
		@content = @data if @error.nil?
	end

	def logout
		@content = @data if @error.nil?
	end

	#Records Controller
	def all_records
		@content = @data if @error.nil?
	end

	def get_record
		@content = @data if @error.nil?
	end

	def create_record
		@content = @data if @error.nil?
	end

	def save_record
		@content = @data if @error.nil?
	end

	def delete_record
		@content = @data if @error.nil?
	end

	def sync_records
	end

end