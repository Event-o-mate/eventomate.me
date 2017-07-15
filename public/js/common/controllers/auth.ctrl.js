(function($){  
	'use strict';

	angular
		.module("EventoMate")
		.controller("AuthenticationController", AuthenticationController)

	function AuthenticationController($scope, $cookies, security, $location, ngDialog) {
		var vm = this

		//Method Bindables
		$scope.login = login 
		$scope.register = register

		//Properties
		vm.security
		vm.errorMsg
		vm.user 
		vm.password
		vm.name
		//Defining scope properties due to bug in ngDialog not handling controllerAs mode
		$scope.user
		$scope.password
		$scope.name
		$scope.loginSubmited
		$scope.userValid

		init()

		function init() {
			vm.security = security
			vm.email = $scope.email
			vm.password = $scope.password
			$scope.loginSubmited = false
			$scope.registerSubmited = false
			$scope.userValid = false
		}

		function register() {
			console.log("-=== Register User ===-")

			var data = {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password
			}

			var jsonData = angular.toJson(data)

			if ($scope.registerForm.$valid) {
				vm.security.registerUser(jsonData)
				.then(function(data) {
					console.log(data)	
					if (data.errors == undefined) {
						updateCookie(data)
						ngDialog.closeAll()
						$scope.userValid = true
					}
					else {
						$scope.registerSubmited = true
						$scope.userValid = false
						$scope.errorMsg = data.errors.msg
					}
				})
				.catch(function(error){
					$scope.registerSubmited = true
					$scope.userValid = false
					scope.errorMsg = error
				})
			}

		}

		function login() {
			var data = {
				email: $scope.email,
				password: $scope.password
			}
			
			var jsonData = angular.toJson(data)

			if ($scope.loginForm.$valid){
				vm.security.loginUser(jsonData)
				.then(function(data) {
					console.log(data)
					if (data.errors == undefined) {
						$scope.userValid = true
						updateCookie(data)
						ngDialog.closeAll()
						$location.path('/dashboard')
					}
					else {
						$scope.errorMsg = data.errors.msg
						$scope.loginSubmited = true
						$scope.userValid = false
					}
				})
				.catch(function(error){
					$scope.loginSubmited = true
					$scope.userValid = false
					$scope.errorMsg = error
				})	
			}
		}

		function updateCookie(user) {
			var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 3);
			var userCookie = $cookies.getObject('userCookie')
			userCookie.valid = true
			userCookie.token = user.token
			userCookie.user_id = user.id
			userCookie.email = user.email 
			$cookies.putObject("userCookie", userCookie, {'expires': expireDate})
			vm.security.userValid = true
		}

	}
})()