#api.rb
require 'haml'
require "coffee-script"
require 'sinatra/assetpack'


class WebController < Sinatra::Base
	enable :method_override

	set :root, File.dirname(File.dirname(__FILE__))
	set :public_folder, 'public'
	
	register Sinatra::Reloader
	register Sinatra::AssetPack

	helpers do 
		def html(view)
			File.read(File.join("#{settings.views}/templates", "#{view.to_s}.html"))
		end
	end

	assets do
		serve '/js',   from: 'public/js'
		serve '/css',  from: 'public/css'
		serve '/imgs', from: 'public/img' 

    # array of style files
    css :main, [
      '/css/main.css'
    ]

    # array of angular app files
    js :ngApp, [
    	# Global app js file
    	'/js/app.js',
    	# App common libs
    	'/js/common/directives/ngRegister.js',
    	'/js/common/directives/ngLogin.js',
    	#Controllers
    	'/js/landing_page/landing.ctrl.js',
    	'/js/dashboard/dashboard.ctrl.js',
    	'/js/event/event.ctrl.js',
    	'/js/new_event/new_event.ctrl.js'
    ]

    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :simple   # :simple | :sass | :yui | :sqwish
	end

	# fetch layout and landing page
	get '/' do 
		haml :index
	end

	# fetch angular templates
	get '/templates/:filename' do
		template = File.join("#{settings.views}/templates", "#{params[:filename]}.html")
		send_file template
		# haml params[:filename].to_sym
	end
end


