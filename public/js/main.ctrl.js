(function ($) {
	'use strict';
	
  var app = angular.module('eventomate')
  	
  app.controller('MainController', function($scope){
  		$scope.test = "Simun ima brkove"

  		console.log("Main Contrller " + test)
  		console.log("Main  " + $scope.test)
  })
})