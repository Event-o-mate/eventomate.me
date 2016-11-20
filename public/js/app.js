(function () {
  'use strict';

  var app = angular.module("eventomate", ["ngRoute"]);
  app.config(function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "landing.html"
      })
      .when("/dashboard", {
          templateUrl : "dashboard.html"
      })
      .when("/event_page", {
          templateUrl : "event_page.html"
      })
      .when("/new_event", {
          templateUrl : "new_event.html"
      });
  });
})()