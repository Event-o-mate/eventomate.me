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
          templateUrl : "dashboard.html",
          controller: "MainController" 
      })
      .when("/event_page", {
          templateUrl : "event_page.html",
          controller: "MainController" 
      })
      .when("/new_event", {
          templateUrl : "new_event.html",
          controller: "MainController" 
      });
    });
})()