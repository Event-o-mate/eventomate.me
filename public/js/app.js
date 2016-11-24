(function() {
  'use_strict'

  var modules = [
    "ngRoute",
    'ngResource',
    'ngCookies',
    'google.places',
    'ui.bootstrap.datetimepicker'
  ]

  angular
    .module("EventoMate", modules)
    //.run()
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

  // function authenticate($rootScope, $location, $log, $cookies) {
  //   $log.debug("-== Authenticate Path ==-")
  //   $rootScope.$on('$routeChangeStart', function (event, next, current) {
      
  //     // redirect to login page if not logged in and trying to access a restricted page
  //     var restrictedPage = $.inArray($location.path(), ['/login', '/install']) === -1;
      
  //     if ($location.path() == '/login') {
  //       $rootScope.loggedIn = false
  //     };
      
  //     if ($cookies.get('user')) {
  //       $rootScope.loggedIn = true
  //     };
        
  //     if (restrictedPage && !$cookies.get('user')) {
  //      $location.path('/login')
  //     }
  //   });
  // } 

  //Auth v2
  // function($rootScope, $location) {

  //   // register listener to watch route changes
  //   $rootScope.$on( "$routeChangeStart", function(event, next, current) {
  //     if ( $rootScope.loggedUser == null ) {
  //       // no logged user, we should be going to #login
  //       if ( next.templateUrl == "partials/login.html" ) {
  //         // already going to #login, no redirect needed
  //       } else {
  //         // not going to #login, we should redirect now
  //         $location.path( "/login" );
  //       }
  //     }         
  //   });
  // }

})()




