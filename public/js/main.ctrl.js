(function ($) {
  angular
  	.module('eventomate')
  	.controller('MainController')

  	function MainController($scope) {

  		$scope.test = "Simun ima brkove"

  		console.log("Main Contrller " + test)
  		console.log("Main  " + $scope.test)
  	}


})