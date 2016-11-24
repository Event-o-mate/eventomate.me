(function(){
  'use strict'

  angular
  	.module("adminClient")
  	.factory("event", event)

  function event($resource) {
  	var service {
  		hosting: hosting,
  		attending: attending,
  		create: create,
  		save: save,
  		remove: remove
  	}

  	var url = {
  		crud: '/api/records/event/:id',
  		hosting: '/api/query/hosting',
  		attending: '/api/query/attending'
  	} 
  	var Event = $resource(url.crud)
  	var AttendingEvents.$resource(url.hosting)
  	var HostingEvents.$resource(url.hosting)

  	return service

  	function create(data, created, error) {
  		Event.save(data, function(response){
  			created(response)
  		}, function(errReponse){
  			error(errReponse)
  		})
  	}

  	function hosting(success, error) {
  		HostingEvents.query(function(response){
  			success(response)
  		}, function(errReponse){
  			error(errReponse)
  		})
  	}

  	function attending(success, error) {
  		AttendingEvents.query(function(response){
  			success(response)
  		}, function(errReponse){
  			error(errReponse)
  		})
  	}
  }
})