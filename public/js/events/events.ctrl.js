(function($){  
	angular
		.module("EventoMate")
		.controller("EventsController", EventsController)

	function EventsController($scope, $location, security) {
		var vm = this

		//Method Bindables
		vm.publish = publish
		vm.save = save

		//Properties
		vm.attending = []
		vm.hosting = []
		vm.title = "Movie Screening: Infinity wars"
		vm.startTime = "11. August 2017 18:30"
		vm.endTime = "11. August 2017 19:30"
		vm.description = "Come and see the new movie!"
		vm.location = "Josipa Prikrila 3"

		init()

		function init() {

		}

		function publish() {
			if (!security.userValid) {
				console.log("Register or login first")
				$rootScope.registerInProgress = true
			}

		}

		function save() {
			var eventData = {
				"title": vm.title,
				"startTime": vm.startTime,
				"endTime": vm.endTime,
				"description": vm.description,
				"lat": vm.location.lat,
				"lng": vm.location.lng
			}

			vm.hosting.push(eventData)
			console.log("-== Save event, with data ==-")
			console.log(eventData)
			$location.path('/dashboard')
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


	}

})()