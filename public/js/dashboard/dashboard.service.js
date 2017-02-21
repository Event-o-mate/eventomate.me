(function(){
  'use strict'

  angular
  	.module("EventoMate")
  	.factory("DashboardService", DashboardService)

  function DashboardService($http, $resource, security) {

  	var service = {
  		hostingEvents: hosting,
  		attendingEvents: attending
  	}

  	return service

  	function hosting() {

      var hostingEventsUrl = '/api/users/'+ security.userId() +'/events'

      function getHostingEventsCompleted(response) {
        return response.data
      }

      function getHostingEventsRequestFailed(error) {
        return error
      }

  		var getHostingEventsRequest = $http({
        method: "GET", 
        url: hostingEventsUrl
      })
      .then(getHostingEventsCompleted)
      .then(getHostingEventsRequestFailed)

      return getHostingEventsRequest

  	}

  	function attending() {
  		var attendingEventsUrl = '/api/users/'+ security.userId() +'/attendees'
        
      function getAttendingEventsCompleted(response) {
        return response.data
      }

      function getAttendingEventsFailed(error) {
        return error
      }

      var getAttendingEventsRequest = $http({
        method: "GET", 
        url: attendingEventsUrl
      })
      .then(getAttendingEventsCompleted)
      .then(getAttendingEventsFailed)

      return getAttendingEventsRequest
  	}
  }
})()
