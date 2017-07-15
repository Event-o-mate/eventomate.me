(function($){  
	'use strict';
	
	angular
		.module("EventoMate")
		.controller("HomeController", HomeController)

	function HomeController($scope, HomeService) {
		var vm = this

		vm.eventsCount

		init()

		function init() {
			HomeService.getEventCount()
			.then(function(response){
				vm.eventsCount = response.length
			})
		}

	}

})()
