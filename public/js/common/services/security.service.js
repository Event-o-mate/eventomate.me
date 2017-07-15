(function(){  
  'use strict';

  angular
    .module("EventoMate")
    .factory('security', security);

    function security($http, $cookies) {
      var userCookie
      
      var service =  {
        registerUser: registerUser,
        loginUser:    loginUser,
        userValid:    false,
        userId: getUserId,
        userEmail: getUserEmail
      };

      var url = {
        register: '/api/authenticate/register',
        login:    '/api/authenticate/login'
      }

      return service

      function registerUser(data) {
        return $http.post(url.register, data)
          .then(registrationComplete)
          .catch(registrationFailed);

        function registrationComplete(response) {
          return response.data;
        }

        function registrationFailed(error) {
          return error
        }
      }

      function loginUser(data) {
        return $http.post(url.login, data)
          .then(loginComplete)
          .catch(loginFailed);

        function loginComplete(response) {
          return response.data;
        }

        function loginFailed(error) {
          return error
        }
      }

      function getUserId() {
        userCookie = $cookies.getObject("userCookie")
        if (userCookie != null) {
          return userCookie.user_id
        }
        
      }

      function getUserEmail() {
        userCookie = $cookies.getObject("userCookie")
        if (userCookie != null) {
          return userCookie.email
        }
      }
    }
})()