(function(){  
  'use strict';

  angular
    .module("EventoMate")
    .factory('User', User);

  function User($http, security) {
  	
    var service = {
      get:    getUser,
      // create: createUser,
      update: updateUser,
      changePassword: changeUserPassword,
      account: {
        get:    getAccount,
        update: updateAccount,
      } 
  	}

    var url = {
      root: "/api",
      users: "/users",
      account: "/accounts"
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
          requestBody.data = data
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

    function getUser(success, failure) {
      var requestUrl = url.root + url.users + '/' + security.userId()
      request(method.get, requestUrl)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response)
        }
      })
      .catch(function(error){
        failure(response)
      })
    }

    function updateUser(id) {
      var requestUrl = url.root + '/' + security.userId()

    }

    function getAccount(success, failure) {
      var requestUrl = url.root + url.users + '/' + security.userId() + '/account'
      request(method.get, requestUrl)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response)
        }
      })
      .catch(function(error){
        failure(response)
      })
    }

    function updateAccount(id, data, success, failure) {
      var requestUrl = url.root + url.account + '/' + id

      request(method.put, requestUrl, data)
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

    function changeUserPassword(data, success, failure) {
      var requestUrl = url.root + '/authenticate/change/password'

      request(method.post, requestUrl, data)
      .then(function(response){
        if (response.errors == undefined) {
          success(response)
        }
        else {
          failure(response)
        }
      })
      .catch(function(error){
        failure(error)
      })
    }

  }

})()