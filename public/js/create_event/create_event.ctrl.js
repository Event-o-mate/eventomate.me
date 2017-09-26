(function($){  

	'use strict';

	angular
		.module("EventoMate")
		.controller("CreateEventController", CreateEventController)

	function CreateEventController($scope, $routeParams, $location, security, ngDialog, CreateEventService) {
		var vm = this

		//Method Bindables
		vm.createEvent = createEvent
		vm.addSection = addSection
		vm.removeSection = removeSection
		vm.selectWidget = selectWidget

		//Properties
		vm.eventId
		vm.title
		vm.address
		vm.startTime
		vm.endTime
		vm.location
		vm.description
		vm.sections
		vm.eventService
		vm.security

		init()

		function init() {
			vm.eventService = CreateEventService
			vm.sections = []
			vm.security = security
		}

		function createEvent() {

			console.log("create event")
	
			function openLogin(callback) {
				ngDialog.open({
					template: 'loginDialog',
					controller: "AuthenticationController"
				})
				.closePromise.then(function (data) {
					if (data.value == "register") {
						ngDialog.open({
							template: 'registerDialog',
							controller: "AuthenticationController"
						})
						.closePromise.then(function(){
							callback()
						})
					}
					else {
						callback()
					}
				});
			}

			function validateUser(callback) {
				if (!vm.security.userValid)	{
					openLogin(function(){
						callback()
					})
				}
			}

			if ($scope.createEventForm.$valid) {

				console.log("form is valid")

				vm.eventData = JSON.stringify({
					"title": vm.title,
					"address": vm.location.formatted_address,
					"lat": vm.location.geometry.location.lat(),
					"lng": vm.location.geometry.location.lng(),
					"start_date": $scope.dateRangeStart,
					"finish_date": $scope.dateRangeEnd,
					"description": vm.description,
					"sections": vm.sections
				})
				
				validateUser(function(){

					console.log("validate user")
					if (vm.security.userValid) {
						
						console.log("user is valid")
						
						vm.eventService.create(vm.eventData)
						.then(function(response) {
							if (response.errors === undefined) {
								$location.path("/dashboard")
							}
						})
						.catch(function(error){
								console.log(error)
						})
					}
					else {
						console.log("user is NOT valid")
					}

				})
			}
		}

		function addSection(type) {
			var widgetMenu = vm.sections.filter(function(section){
				return section.type == type
			})

			if (vm.sections.length < 3){
				if (widgetMenu.length < 1 ) {
					var section = {"type": type}
					vm.sections.push(section)
				}
			}
		}

		function removeSection(type) {
			vm.sections = vm.sections.filter(function(section){
				return section.type != type
			})
		}

		function selectWidget(type) {
			vm.sections[vm.sections.length - 1].type = type
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