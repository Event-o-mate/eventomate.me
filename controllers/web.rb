#api.rb
require 'haml'
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

    # main css style file
    css :main, [
      '/css/main.css'
    ]

    # css local libs
    css :libs, [
    	#bootstrap date time picker
    	'/lib/datetimepicker/css/datetimepicker.css',
      #ngDialog
      'lib/ngDialog/css/ngDialog.min.css',
      'lib/ngDialog/css/ngDialog-theme-default.css'
    ]

    # angular app files
    js :ngApp, [
    	#main app js file
    	'/js/app.js',
    	#app common libs
    	'/js/common/services/security.service.js',
    	'/js/common/controllers/menu.ctrl.js',
      '/js/common/controllers/auth.ctrl.js',
    	'/js/common/lib/autocomplete.js',
      '/js/common/directives/datetime.js',
    	#pages controllers
    	'/js/home/home.ctrl.js',
    	'/js/dashboard/dashboard.ctrl.js',
    	'/js/events/events.ctrl.js',
        #pages services
        '/js/events/event.service.js'
    ]

    # js local libs
    js :libs, [
    	#bootstrap date time picker
    	'/lib/datetimepicker/js/datetimepicker.js',
    	'/lib/datetimepicker/js/datetimepicker.templates.js',
      #ngDialog
      'lib/ngDialog/js/ngDialog.min.js',
      #ngMap
      'lib/ngMap/ngMap.js',
      #ngGravatar
      'lib/ngGravatar/ngGravatar.js'
    ] 
	end

	# fetch layout and index(ng-view) with home page
	get '/' do 
		haml :index
	end

	# fetch angular templates
	get '/templates/:filename' do
		template = File.join("#{settings.views}/templates", "#{params[:filename]}.html")
		send_file template
	end
end


