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
    	'/js/lib/datetimepicker/css/datetimepicker.css',
      #ngDialog
      '/js/lib/ngDialog/css/ngDialog.min.css',
      '/js/lib/ngDialog/css/ngDialog-theme-default.css',
      #ngUISwitchButton
      '/js/lib/ngSwitch/angular-ui-switch.css'
    ]

    # angular app files
    js :ngApp, [
      #main app js file
      '/js/app.js',
    	#app common libs
    	'/js/common/services/security.service.js',
    	'/js/common/controllers/menu.ctrl.js',
      '/js/common/controllers/auth.ctrl.js',
      '/js/common/directives/datetime.js',
      '/js/common/services/user.service.js',
      #home page
    	'/js/home/home.ctrl.js',
      '/js/home/home.service.js',
      #dashboard page
    	'/js/dashboard/dashboard.ctrl.js',
    	'/js//dashboard/dashboard.service.js',
      #event page
      '/js/event/event.ctrl.js',
      '/js/event/event.service.js',
      #create event page
      '/js/create_event/create_event.ctrl.js',
      '/js/create_event/create_event.service.js'
    ]

    # js libs
    js :libs, [
    	#bootstrap date time picker
    	'/js/lib/datetimepicker/js/datetimepicker.js',
    	'/js/lib/datetimepicker/js/datetimepicker.templates.js',
      #ngDialog
      '/js/lib/ngDialog/js/ngDialog.min.js',
      #ngMap
      '/js/lib/ngMap/ngMap.js',
      #ngGravatar
      '/js/lib/ngGravatar/ngGravatar.js',
      '/js/lib/autocomplete.js',
      #ngUISwitchButton
      '/js/lib/ngSwitch/angular-ui-switch.js'
    ] 

    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :simple   # :simple | :sass | :yui | :sqwish

	end

	# fetch layout and index(ng-view) with home page
  get '/' do 
    redirect '/index.html'
	end

	# fetch angular templates
	# get '/templates/:filename' do
	# 	template = File.join("#{settings.views}/templates", "#{params[:filename]}.html")
	# 	send_file template
	# end
end


