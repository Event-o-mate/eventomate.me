(function(){
  'use strict'

  angular
  	.module("EventoMate")
  	.factory("Event", EventService)

    function EventService($http, $resource, $cookies) {
      var userCookie = $cookies.getObject('userCookie')

      var service = {
        hosting: hosting,
        attending: attending,
        create: create,
        fetch: fetch,
        sumbitRsvp: sumbitRsvp,
        attendees: attendees
      }
      
      var url = {
        get: '/api/records/event',
        hosting: '/api/records/user/' + userCookie.user_id + '/event',
        attending: '/api/query/user/' + userCookie.user_id + '/attending',
        createEvent: '/api/records/user/' + userCookie.user_id + '/event'
      }

      $http.defaults.headers.common.Authorization = "hash="+userCookie.token
      $http.defaults.headers.common.Accept = "application/json"

      if (userCookie !== undefined) {
        if (userCookie.token !== undefined) {
          url.token = userCookie.token
        }
      } 

    	return service

      // create event
    	function create(data) {
        function createRequestCompleted(response) {
          return response.data
        }

        function createRquestFailed(error) {
          return error
        }

        var createRquest = $http({
          method: "PUT",
          url: url.createEvent,
          data: data
        })
        .then(createRequestCompleted)
        .catch(createRquestFailed)

        return createRquest
    	}

      function fetch(id) {
        var get_url = url.get + '/' + id
        
        function fetchRequestCompleted(response) {
          return response.data
        }

        function fetchRequestFailed(error) {
          return error
        }

        var fetchRequest = $http({
          method: "GET", 
          url: get_url
        })
        .then(fetchRequestCompleted)
        .then(fetchRequestFailed)

        return fetchRequest
      }

    	function hosting() {
        function getHostingEventsCompleted(response) {
          return response.data
        }

        function getHostingEventsRequestFailed(error) {
          return error
        }

    		var getHostingEventsRequest = $http({
          method: "GET", 
          url: url.hosting
        })
        .then(getHostingEventsCompleted)
        .then(getHostingEventsRequestFailed)

        return getHostingEventsRequest

    	}

      function sumbitRsvp(event_id, data) {
        function rsvpRequestCompleted(response) {
          return response.data
        }

        function rsvpRquestFailed(error) {
          return error
        }

        var submitUrl = '/api/records/event/'+event_id+'/attendee'

        var submitRsvpRquest = $http({
          method: "PUT",
          url: submitUrl,
          data: data
        })
        .then(rsvpRequestCompleted)
        .catch(rsvpRquestFailed)

        return submitRsvpRquest
      }

    	function attending(success, error) {
        function getAttendingEventsCompleted(response) {
          return response.data
        }

        function getAttendingEventsFailed(error) {
          return error
        }

        var getAttendingEventsRequest = $http({
          method: "GET", 
          url: url.attending
        })
        .then(getAttendingEventsCompleted)
        .then(getAttendingEventsFailed)

        return getAttendingEventsRequest
    	}

      function attendees(event_id) {
        function getAttendeesCompleted(response) {
          return response.data
        }

        function getAttendeesFailed(error) {
          return error
        }

        var attendeesUrl = url.get + '/' + event_id + '/attendee'

        var getAttendingEventsRequest = $http({
          method: "GET", 
          url: attendeesUrl
        })
        .then(getAttendeesCompleted)
        .then(getAttendeesFailed)

        return getAttendingEventsRequest
      }

    }
})()