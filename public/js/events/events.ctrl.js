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
		vm.event_id
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
		
		init()

		//Bindables
		function init() {
			vm.security = security
			vm.event = Event
			vm.event_id = $routeParams.id
			vm.currentUserAttending = false

			if (vm.event_id != undefined) {
				vm.event.fetch(vm.event_id)
				.then(function(response){
					vm.title = response.title
					vm.startTime = response.start_date
					vm.endTime = response.finish_date
					vm.address = response.address
					vm.lat = response.lat
					vm.lng = response.lng
					vm.description = response.description
				})

				vm.event.attendees(vm.event_id)
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

		function publish() {

			var createEvent = function() {
				if (vm.security.userValid) {
					vm.eventData = {
						"title": vm.title,
						"address": vm.location.formatted_address,
						"lat": vm.location.geometry.location.lat(),
						"lng": vm.location.geometry.location.lng(),
						"start_date": $scope.dateRangeStart,
						"finish_date": $scope.dateRangeEnd,
						"description": vm.description,
					}

					var jsonData = JSON.stringify(vm.eventData)

					vm.event.create(jsonData)
					.then(function(response){
						console.log(response)
						if (response.errors === undefined) {
							$location.path('/dashboard')
						}
					})
					.catch(function(error){
						console.log(error)
					})
				}
			}

			if ($scope.createEventForm.$valid) {
				if (!vm.security.userValid) {
					ngDialog.open({
						template: 'loginDialog',
						controller: 'AuthenticationController',
						preCloseCallback: createEvent 
					})
				}
				else {
					createEvent()
				}	
			}
		}

		//Default datapicker settings 
		$scope.endDateBeforeRender = endDateBeforeRender
		$scope.endDateOnSetTime = endDateOnSetTime
		$scope.startDateBeforeRender = startDateBeforeRender
		$scope.startDateOnSetTime = startDateOnSetTime

		function startDateOnSetTime () {
		  $scope.$broadcast('start-date-changed');
		}

		function endDateOnSetTime () {
		  $scope.$broadcast('end-date-changed');
		}

		function startDateBeforeRender ($dates) {
		  if ($scope.dateRangeEnd) {
		    var activeDate = moment($scope.dateRangeEnd);
		    $dates.filter(function (date) {
		      return date.localDateValue() >= activeDate.valueOf()
		    }).forEach(function (date) {
		      date.selectable = false;
		    })
		  }
		}

		function endDateBeforeRender ($view, $dates) {
		  if ($scope.dateRangeStart) {
		    var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

		    $dates.filter(function (date) {
		      return date.localDateValue() <= activeDate.valueOf()
		    }).forEach(function (date) {
		      date.selectable = false;
		    })
		  }
		}
	}

})()