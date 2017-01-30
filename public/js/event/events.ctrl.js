(function($){  

	'use_strict'

	angular
		.module("EventoMate")
		.controller("EventsController", EventsController)

	function EventsController($scope, $routeParams, $location, security, ngDialog, Event) {
		var vm = this

		//Method Bindables
		vm.publish = publish
		vm.submitRsvp = submitRsvp
		
		//Properties
		vm.eventId
		vm.title
		vm.address
		vm.startTime
		vm.endTime
		vm.lat
		vm.lng
		vm.description
		vm.eventData
		vm.attendees
		vm.location
		vm.currentUserAttending
		vm.eventSections
		vm.eventComments
		
		init()

		//Bindables
		function init() {

			vm.showWidgets = false
			vm.security = security
			vm.event = Event
			vm.eventId = $routeParams.id
			vm.currentUserAttending = false

			if (vm.eventId != undefined) {
				vm.event.fetch(vm.eventId)
				.then(function(response){
					vm.title = response.title
					vm.startTime = response.start_date
					vm.endTime = response.finish_date
					vm.address = response.address
					vm.lat = response.lat
					vm.lng = response.lng
					vm.description = response.description
				})

				vm.event.attendees(vm.eventId)
				.then(function(response){
					vm.attendees = response
					var userInAttending = vm.attendees.filter(function ( attendee ) {
					    return attendee.user_id == vm.security.userId()
					})[0];
					
					if (userInAttending != undefined) {
						vm.currentUserAttending = true
					}
				})

				vm.event.getSections(vm.eventId)
				.then(function(response){
					vm.eventSections = response
				})
				.then(function(error){
					console.log(error)
				})

				vm.event.getComments(vm.eventId)
				.then(function(response){
					vm.eventComments = response
				})
				.then(function(error){
					console.log(error)
				})

			}
		}

		function submitRsvp() {

			var sendAttendance = function() {
				var userInAttending = vm.attendees.filter(function ( attendee ) {
			    return attendee.user_id == vm.security.userId()
				})[0];
				
				if (userInAttending != undefined) {
					vm.currentUserAttending = true
				}

				if (vm.security.userValid) {
					if (!vm.currentUserAttending) {
						var jsonData = JSON.stringify({user_id: vm.security.userId()})
						vm.event.sumbitRsvp(vm.event_id, jsonData)
						.then(function(response){
							console.log(response)
							vm.currentUserAttending = true

							vm.event.attendees(vm.event_id)
							.then(function(response){
								vm.attendees = response
							})

						})	
					}
				}
			}

			if (vm.security.userValid) {
				sendAttendance()				
			}
			else {
				ngDialog.open({
					template: 'loginDialog',
					controller: 'AuthenticationController',
					preCloseCallback: sendAttendance 
				})
			}
		}

		function addComment() {

			if(addCommentForm.$valid) {
				vm.event.
			}
		}

	}

})()