(function () {
  'use strict';

  var loadAngularModules = [
    "ngRoute"
  ]
 
  angular
    .module('eventomate', loadAngularModules)
    .config(['$routeProvider', function($routeProvider){   
      // Configure url routes
      $routeProvider.
      when('/', {
      	//Admin dashboard
        templateUrl:  'landing.html',
        controller:   'LoginController',
        controllerAs: 'login',
      }).
      when('/new_event', {
        //Admin dashboard
        templateUrl:  'install/install.html',
        controller:   'InstallController',
        controllerAs: 'login',
      }).
      when('/event_page', {
        //Admin dashboard
        templateUrl:  'event_page.html',
        controller:   'EventController',
        controllerAs: 'login',
      }).
      when('/dashboard', {
        //Admin dashboard
        templateUrl: 'dashboard.html',
        controller: 'DashboardController',
        controllerAs: "dashboard"
      }).
      otherwise({
        redirectTo: '/'
      });
    }])
})()