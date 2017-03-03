#TODO: Add notification layer
#TODO: Connect to ui 

#load sinatra
require 'rubygems'
require 'sinatra/base'
require 'sinatra/contrib'

#require global dependencies
require 'data_mapper'
require 'json'

#load models
Dir[File.dirname(__FILE__) + '/models/*.rb'].each {|file| require file}

#load helpers
Dir[File.dirname(__FILE__) + '/helpers/*.rb'].each {|file| require file}

#load managers
Dir[File.dirname(__FILE__) + '/managers/*.rb'].each {|file| require file}

#load controllers
Dir[File.dirname(__FILE__) + '/controllers/*.rb'].each {|file| require file}

#Setup Database
if ENV['RACK_ENV'] == 'development' 
	DataMapper.setup(:default, "postgres://sinatra_dev:developer@127.0.0.1/sinatra_db")
elsif ENV['RACK_ENV'] == 'heroku'
	DataMapper.setup(:default, ENV['DATABASE_URL'])
end
DataMapper.finalize.auto_upgrade!

#map controllers

#api controllers
map('/api/records') 		 {run RecordsController}
map('/api/authenticate') {run AuthenticationController}
map('/api/users')				 {run UsersController}
map('/api/accounts')		 {run AccountsController}
map('/api/events')			 {run EventsController}
map('/api/attendees')		 {run AttendeesController}
map('/api/sections')		 {run SectionsController}
map('/api/comments')		 {run CommentsController}
map('/api/widgets')			 {run WidgetsController}

#web page controller
map('/') 								 {run WebController}