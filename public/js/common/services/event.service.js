(function(){  
  'use strict'

  angular
    .module("EventoMate")
    .factory('Event', Event);

  function Event($http) {

  	var service = {
      get:        getEvent,
  		host:       getEventHost,
  		attendees:  getEventAttendes,
  		sections:   getEventSections,
      comments:   getEventComments,
      rsvp:       submitRsvp,
      revokeRsvp: revokeRsvp,
      create:     createEvent,
  	}

  	var url = {
      root: "api/events"
  	}

    var method = {
      get:    "GET",
      post:   "POST",
      put:    "PUT",
      delete: "DELETE"
    }

    var request = function(method, url, data) {

        var requestBody = {
          method: method, 
          url: url
        }

        if (data !== undefined) {
          requestBody.push({data: data})
        }

        function httpRequestCompleted(response) {
          return response
        }

        function httpRequestFailed(error) {
          return error
        }

        var httpRequest = $http(requestBody)
        .then(httpRequestCompleted)
        .then(httpRequestFailed)

        return httpRequest
    }

  	return service 

    function getEvent(id, success, failure) {
      var requestURL = url.root + '/' + id 
      
      request(method.get, requestURL)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }

    function createEvent(data, success, failure) {
      request(method.post, url.root, data)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      }) 
    }

    function getEventHost(id, success, failure) {
      var requestURL = url.root + '/' + id + '/hosting'
      
      request(method.get, requestURL)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      }) 
    }

    function getEventAttendees(id, success, failure) {
      var requestURL = url.root + '/' + id + '/attendees'
      
      request(method.get, requestURL)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }

    function getEventSections(id, success, failure) {
      var requestURL = url.root + '/' + id + '/sections'
      request(method.get, requestURL)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }

    function getEventComments(id, success, failure) {
      var requestURL = url.root + '/' + id + '/comments'
      request(method.get, requestURL)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }

    function submitRsvp(id, data, success, failure) {
      var requestURL = url.root + '/' + id + '/attendees'
      request(method.post, requestURL, data)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response.errors)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }
  }

})