(function(){  
  'use strict'

  angular
    .module("EventoMate")
    .factory('security', security);

    function security($http, $cookies) {
      var service =  {
        registerUser: registerUser,
        loginUser:    loginUser,
        userValid:    false
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
            console.log('XHR Failed for getAvengers.' + error.data);
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
            console.log('XHR Failed for getAvengers.' + error.data);
        }
      }
    }
})()