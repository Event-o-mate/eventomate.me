(function() {
  'use_strict'

  var modules = [
    "ngRoute",
    'ngResource',
    'ngCookies'
  ]

  angular
    .module("EventoMate", modules)
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when("/", {
          controller: "LandingPageController",
          controllerAs: "landing",
          templateUrl: "templates/landing"
      })
      .when("/dashboard", {
          controller: "DashboardController",
          controllerAs: "dashboard",
          templateUrl : "templates/dashboard" 
      })
      .when("/event_page", {
          controller: "EventController",
          controllerAs: "event",
          templateUrl : "templates/event_page"
      })
      .when("/new_event", {
          controller: "NewEventController",
          controllerAs: "new_event",
          templateUrl : "templates/new_event"
      });
    }])
})()




