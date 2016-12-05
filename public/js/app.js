(function() {
  'use_strict'

  var modules = [
    "ngRoute",
    'ngResource',
    'ngCookies',
    'google.places',
    'ui.bootstrap.datetimepicker',
    'ngDialog',
    'ngMap',
    'ui.gravatar',
    'ngMessages'
  ]

  angular
    .module("EventoMate", modules)
    .run(authenticate)
    .config(['$routeProvider', function($routeProvider, $routeParams) {
      $routeProvider
      .when("/", {
          controller: "HomeController",
          controllerAs: "landing",
          templateUrl: "templates/home"
      })
      .when("/dashboard", {
          controller: "DashboardController",
          controllerAs: "dashboard",
          templateUrl : "templates/dashboard" 
      })
      .when("/event/:id", {
          controller: "EventsController",
          controllerAs: "events",
          templateUrl : "templates/event"

      })
      .when("/create_event", {
          controller: "EventsController",
          controllerAs: "events",
          templateUrl : "templates/create_event"
      });
    }])

    function authenticate($rootScope, $location, $cookies, security) {
      var userCookie = $cookies.getObject('userCookie')
      
      if (userCookie == null) {
        var userCookie = {
          valid: false,
          token: "",
          remember: false,
          user_id: 0,
          email: null
        }
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        $cookies.putObject('userCookie', {'expires': expireDate})
      }
      security.userValid = userCookie.valid

      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/dashboard']) != -1 ;
  
        if (restrictedPage && !security.userValid) {
          $location.path("/")
        }
      });

    }

})()




