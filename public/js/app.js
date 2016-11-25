(function() {
  'use_strict'

  var modules = [
    "ngRoute",
    'ngResource',
    'ngCookies',
    'google.places',
    'ui.bootstrap.datetimepicker',
    'ngDialog'
    // 'ngDateTime'
  ]

  angular
    .module("EventoMate", modules)
    .run(authenticate)
    .config(['$routeProvider', function($routeProvider) {
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
      .when("/event", {
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
      
      if (userCookie.valid === undefined) {
        var userCookie = {
          valid: false,
          token: "",
          remember: false
        }
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        $cookies.putObject('userCookie', {'expires': expireDate})
      }
      security.userValid = userCookie.valid

      // $rootScope.$on('$routeChangeStart', function (event, next, current) {
      
      //   // redirect to login page if not logged in and trying to access a restricted page
      //   var restrictedPage = $.inArray($location.path(), ['/login', '/install']) === -1;
        
      //   if ($location.path() == '/login') {
      //     $rootScope.loggedIn = false
      //   };
        
      //   if ($cookies.get('user')) {
      //     $rootScope.loggedIn = true
      //   };
          
      //   if (restrictedPage && !$cookies.get('user')) {
      //    $location.path('/login')
      //   }
      // });

    }

})()




