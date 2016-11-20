(function () {
  'use strict';

  var eventoMate = angular.module('eventomate', ['ngRoute','ngResource']);

    // configure our routes
    eventoMate.config(function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl: "landing.html",
          controller: "MainController"
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