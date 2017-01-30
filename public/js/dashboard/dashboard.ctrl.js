(function($){  
	angular
		.module("EventoMate")
		.controller("DashboardController", DashboardController)

	function DashboardController($scope, DashboardService) {
		var vm = this

		//Properties
		vm.dashboardService
		vm.hostingEvents
		vm.attendingEvents

		init()

		function init() {
			vm.dashboardService = DashboardService
			vm.event.hosting()
			.then(function(response) {
				console.log('-== Hosting events ==-')
				console.log(response)
				vm.hostingEvents = response
			})
			.catch(function(error){
				console.log(error)
			})

			console.log("attending")
			vm.event.attending()
			.then(function(response){
				console.log('-== Attending events ==-')
				console.log(response)
				vm.attendingEvents = response
			})
			.catch(function(error){
				console.log(error)
			})
		}
	}

})()