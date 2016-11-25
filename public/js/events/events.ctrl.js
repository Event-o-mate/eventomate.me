(function($){  

	'use_strict'

	angular
		.module("EventoMate")
		.controller("EventsController", EventsController)

	function EventsController($scope, $location, security, ngDialog) {
		var vm = this

		//Method Bindables
		vm.publish = publish
		
		//Properties
		vm.attending = []
		vm.hosting = []
		vm.title
		vm.startTime
		vm.endTime
		vm.location
		vm.description
		vm.eventData
		vm.security = security

		//Bindables
		function publish() {
			if (!vm.security.userValid) {
				ngDialog.open({
					template: 'loginDialog',
					controller: 'AuthenticationController',
					preCloseCallback: saveEvent 
				})
			}
			else {
				saveEvent()	
			}
		}

		//Some datapickers magic 
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
		// Magic ends

		//Helpers
		function saveEvent() {
			if (vm.security.userValid) {
				gatherData()
				vm.hosting.push(vm.eventData)
				console.log("-== Save event, with data ==-")
				console.log(vm.eventData)

				Event.create(vm.eventData, function(response){
					console.log(response)
				}, 
				function(error){

				})



				$location.path('/dashboard')
			}
		}

		function gatherData() {
			vm.eventData = {
				"title": vm.title,
				"startTime": $scope.dateRangeStart,
				"endTime": $scope.dateRangeEnd,
				"description": vm.description,
				"location": vm.location
			}
		}
	}

})()