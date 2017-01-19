(function(){
  'use strict'

  angular
  	.module("EventoMate")
  	.factory("Event", EventService)

    function EventService($http, $resource, $cookies, security) {
      var userCookie
      var userId

      var service = {
        hosting: hosting,
        attending: attending,
        create: create,
        fetch: fetch,
        sumbitRsvp: sumbitRsvp,
        attendees: attendees
      }

    	return service

      //reload cookie to get latest user id
      function loadCookie() {
        userCookie = $cookies.getObject('userCookie')
        userId = userCookie.user_id     
      }

      // create event
    	function create(data) {
        loadCookie()

        var createEventUrl = '/api/records/user/'+ userId +'/event'

        function createRequestCompleted(response) {
          return response.data
        }

        function createRquestFailed(error) {
          return error
        }

        var createRquest = $http({
          method: "PUT",
          url: createEventUrl,
          data: data
        })
        .then(createRequestCompleted)
        .catch(createRquestFailed)

        return createRquest
    	}

      function fetch(id) {
        loadCookie()

        var getEventUrl = '/api/records/event/' + id

        function fetchRequestCompleted(response) {
          return response.data
        }

        function fetchRequestFailed(error) {
          return error
        }

        var fetchRequest = $http({
          method: "GET", 
          url: getEventUrl
        })
        .then(fetchRequestCompleted)
        .then(fetchRequestFailed)

        return fetchRequest
      }

    	function hosting() {
        loadCookie()

        var hostingUrl = '/api/records/user/'+ userId +'/event'

        function getHostingEventsCompleted(response) {
          return response.data
        }

        function getHostingEventsRequestFailed(error) {
          return error
        }

    		var getHostingEventsRequest = $http({
          method: "GET", 
          url: hostingUrl
        })
        .then(getHostingEventsCompleted)
        .then(getHostingEventsRequestFailed)

        return getHostingEventsRequest

    	}

      function sumbitRsvp(eventId, data) {
        function rsvpRequestCompleted(response) {
          return response.data
        }

        function rsvpRquestFailed(error) {
          return error
        }

        var submitUrl = '/api/records/event/'+ eventId +'/attendee'

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
        loadCookie()

        var attendingUrl = '/api/query/user/'+ userId +'/attending'
        
        function getAttendingEventsCompleted(response) {
          return response.data
        }

        function getAttendingEventsFailed(error) {
          return error
        }

        var getAttendingEventsRequest = $http({
          method: "GET", 
          url: attendingUrl
        })
        .then(getAttendingEventsCompleted)
        .then(getAttendingEventsFailed)

        return getAttendingEventsRequest
    	}

      function attendees(eventId) {
        loadCookie()

        var attendeesUrl = '/api/records/event/'+ eventId +'/attendee'

        function getAttendeesCompleted(response) {
          return response.data
        }

        function getAttendeesFailed(error) {
          return error
        }


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