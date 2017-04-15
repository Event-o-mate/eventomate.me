(function(){
  'use strict'

  angular
  	.module("EventoMate")
  	.factory("Event", EventService)

    function EventService($http, $resource, security) {
      var service = {
        get: get,
        sumbitRsvp: sumbitRsvp,
        revokeRsvp: revokeRsvp,
        attendees: attendees,
        getSections: getSections,
        getComments: getComments,
        createComment: createComment
      }

    	return service

      function get(id) {
        var getEventUrl = '/api/events/' + id

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

      function sumbitRsvp(eventId, data) {
        var submitRsvpUrl = '/api/events/'+ eventId +'/attendees'

        function rsvpRequestCompleted(response) {
          return response.data
        }

        function rsvpRquestFailed(error) {
          return error
        }

        var submitRsvpRquest = $http({
          method: "POST",
          url: submitRsvpUrl,
          data: data
        })
        .then(rsvpRequestCompleted)
        .catch(rsvpRquestFailed)

        return submitRsvpRquest
      }

      function revokeRsvp(eventId, userId){
        var revokeRsvpUrl = '/api/events/'+ eventId + '/attendees/' + userId 

        function revokeRsvpRequestCompleted(response) {
          return response.data
        }

        function revokeRsvpRquestFailed(error) {
          return error
        }

        var submitRevokeRsvpRquest = $http({
          method: "DELETE",
          url: revokeRsvpUrl
        })
        .then(revokeRsvpRequestCompleted)
        .catch(revokeRsvpRquestFailed)

        return submitRevokeRsvpRquest

      }

      function attendees(eventId) {
        var attendeesUrl = '/api/events/'+ eventId +'/attendees'

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

      function getSections(eventId){
        var sectionsUrl = '/api/events/'+ eventId +'/sections'

        function getSectionsCompleted(response) {
          return response.data
        }

        function getSectionFailed(error) {
          return error
        }

        var getEventSection = $http({
          method: "GET", 
          url: sectionsUrl
        })
        .then(getSectionsCompleted)
        .then(getSectionFailed)

        return getEventSection
      }

      function getComments(eventId) {
        var commentsUrl = '/api/events/'+ eventId +'/comments'

        function getCommentsCompleted(response) {
          return response.data
        }

        function getCommentsFailed(error) {
          return error
        }

        var getEventComments = $http({
          method: "GET", 
          url: commentsUrl
        })
        .then(getCommentsCompleted)
        .then(getCommentsFailed)

        return getEventComments
      }
      
      function createComment(eventId, data) {
        var createCommentUrl = '/api/events/'+ eventId +'/comments'

        function createCommentCompleted(response) {
          return response.data
        }

        function createCommentFailed(error) {
          return error
        }

        var createEventComment = $http({
          method: "POST", 
          url: createCommentUrl,
          data: data
        })
        .then(createCommentCompleted)
        .then(createCommentFailed)

        return createEventComment
      }
    }
})()