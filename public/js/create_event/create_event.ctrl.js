(function($){  

	'use_strict'

	angular
		.module("EventoMate")
		.controller("CreateEventController", CreateEventController)

	function CreateEventController($scope, $routeParams, $location, security, ngDialog, AddEventService) {
		var vm = this

		//Method Bindables
		vm.createEvent
		vm.addSection

		//Properties
		vm.eventId
		vm.title
		vm.address
		vm.startTime
		vm.endTime
		vm.lat
		vm.lng
		vm.description
		vm.eventSections
		vm.eventService

		init()

		function init() {
			vm.eventService = AddEventService
			vm.eventSections = []

		}

		function createEvent() {

			if (!vm.security.userValid){
				var loginDialog = ngDialog.open({
					template: 'loginDialog',
					controller: "AuthenticationController"
				})	
				
				loginDialog.closePromise.then(function(data){
					if (data.value == "register") {
						var registerDialog = ngDialog.open({template: 'registerDialog'})
						registerDialog.closePromise.then(function(data){
							createEvent()
						})
					}
					else {
						createEvent()
					}
				})
			}

			if ($scope.createEventForm.$valid) {
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

				vm.eventService.create(jsonData).then(function(response) {
					if (response.errors === undefined) {
						if (vm.eventSections.length > 0){
							var eventId = response["id"]

							vm.eventService.addwidget(eventId, vm.eventSections[0]).then(function(response){
								if (response.errors === undefined) {
									$location.path('/dashboard')
								}
							})
							.catch(function(error){
								console.log(error)
							})
						}
						
					}
				})
				.catch(function(error){
						console.log(error)
				})
			}
		}

		function addSection() {

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