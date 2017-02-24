(function($){  

	'use_strict'

	angular
		.module("EventoMate")
		.controller("EventsController", EventsController)

	function EventsController($scope, $routeParams, $location, security, ngDialog, Event) {
		var vm = this

		//Method Bindables
		vm.submitRsvp = submitRsvp
		vm.addComment = addComment
		
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
		vm.commentsAdded
		vm.comment
		
		init()

		//Bindables
		function init() {

			vm.showWidgets = false
			vm.security = security
			vm.event = Event
			vm.eventId = $routeParams.id
			vm.currentUserAttending = false
			vm.comment = ''

			if (vm.eventId != undefined) {
				vm.event.get(vm.eventId)
				.then(function(response){
					vm.title = response.title
					vm.startTime = response.start_date
					vm.endTime = response.finish_date
					vm.address = response.address
					vm.lat = response.lat
					vm.lng = response.lng
					vm.description = response.description
					vm.eventSections = response.sections

					// Temp patch
					if (vm.eventSections.length > 0 ) {
						var commentsAdded = vm.eventSections.filter(function ( section ) {
					    return section.widget.type == 'comments'
						})[0];

						if (commentsAdded != undefined) {
							vm.commentsAdded = true

							vm.event.getComments(vm.eventId)
							.then(function(response){
								vm.eventComments = response
							})
							.catch(function(error){
								console.log(error)
							})
						}
					}
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

			if (vm.comment.length > 0) {
				data = {
					"content": vm.comment,
					"user_id": vm.security.userId()
				}
				
				var jsonData = JSON.stringify(data)
				vm.event.createComment(vm.eventId, jsonData)
				.then(function(response){
					vm.eventComments.push(response)
					console.log(vm.eventComments)
				})
				.catch(function(error){
					console.log(error)
				})
			}
		}

	}

})()