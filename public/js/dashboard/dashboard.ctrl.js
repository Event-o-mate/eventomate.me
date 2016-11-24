(function($){  
	angular
		.module("EventoMate")
		.controller("DashboardController", DashboardController)

	function DashboardController($scope) {
		var vm = this

		//Properties
		vm.hostingEvents = [
			{
				"title": "Movie Screening: Infinity wars",
				"startTime": "11. August 2017 18:30",
				"endTime": "11. August 2017 19:30",
				"description": "Come and see the new movie",
				"lat": "vm.location.lat",
				"lng": "vm.location.lng"
			}
		]

		vm.attendingEvents = [
			{
				"title": "BBQ @ Rick\'s",
				"startTime": "19. November 2017 11:30",
				"endTime": "19. November 2017 23:00",
				"description": "It's BYOB, and dates are welcome.",
				"lat": "vm.location.lat",
				"lng": "vm.location.lng"
			}
		]

	}

})()