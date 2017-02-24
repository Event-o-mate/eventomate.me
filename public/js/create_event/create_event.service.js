(function(){
  'use strict'

  angular
    .module("EventoMate")
    .factory("CreateEventService", CreateEventService)

  function CreateEventService($http, $resource, security) {
    var service = {
      create: create
    }

    return service

    // create event
    function create(data) {
      var createEventUrl = '/api/users/'+ security.userId() +'/events'

      function createRequestCompleted(response) {
        return response.data
      }

      function createRquestFailed(error) {
        return error
      }

      var createRquest = $http({
        method: "POST",
        url: createEventUrl,
        data: data
      })
      .then(createRequestCompleted)
      .catch(createRquestFailed)

      return createRquest
    }

    function addWidget(eventId, data) {
      var addWidgetUrl = '/api/events/' + eventId + '/sections'

      function createRequestCompleted(response) {
        return response.data
      }

      function createRquestFailed(error) {
        return error
      }

      var createRquest = $http({
        method: "POST",
        url: addWidgetUrl,
        data: data
      })
      .then(createRequestCompleted)
      .catch(createRquestFailed)

      return createRquest
    }
  }
})()
  