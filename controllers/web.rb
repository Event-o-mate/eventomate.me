#api.rb
require 'haml'

class WebController < Sinatra::Base
	enable :method_override

	set :root, File.dirname(File.dirname(__FILE__))
	set :public_folder, 'public'

  get '/' do 
    redirect '/index.html'
	end

end


