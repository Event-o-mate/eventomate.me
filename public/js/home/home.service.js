(function(){
  'use strict';

  angular
    .module("EventoMate")
    .factory("HomeService", HomeService)

  function HomeService($http, $resource, security) {
    var service = {
      getEventCount: count
    }

    return service

    function count(){
      var getEventUrl = '/api/events/'

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
  }
})()