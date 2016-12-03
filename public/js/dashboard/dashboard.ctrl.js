(function($){  
	angular
		.module("EventoMate")
		.controller("DashboardController", DashboardController)

	function DashboardController($scope, Event) {
		var vm = this

		//Properties
		vm.event = Event
		vm.hostingEvents
		vm.attendingEvents

		init()

		function init() {
			console.log("init")
			vm.event.hosting()
			.then(function(response) {
				console.log('-== Hosting events ==-')
				console.log(response)
				vm.hostingEvents = response
			})
			.catch(function(error){

			})

			console.log("attending")
			vm.event.attending()
			.then(function(response){
				console.log('-== Attending events ==-')
				console.log(response)
				vm.attendingEvents = response
			})
		}
	}

})()