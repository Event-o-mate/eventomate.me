(function($){  
	'use strict'

	angular
		.module("EventoMate")
		.controller("AuthenticationController", AuthenticationController)

	function AuthenticationController($scope, $cookies, security, ngDialog) {
		var vm = this

		//Method Bindables
		$scope.login = login 
		$scope.register = register

		//Properties
		vm.security

		$scope.email
		$scope.password
		$scope.name

		init()

		function init() {
			vm.security = security
		}

		function register() {
			console.log("-=== Register User ===-")

			var data = {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password
			}

			console.log("-= with data")
			console.log(data)

			var jsonData = angular.toJson(data)

			vm.security.registerUser(jsonData).then(function(data) {
				console.log("-= server responded =-")
				console.log(data)	
				if (data.errors == undefined) {
					console.log("-= success =-")
					updateCookie(data)
					ngDialog.closeAll()
				}
				else {
					console.log("-= error: " + data.errors.code + " | " + data.errors.msg)
					$cookies.put("userValid", false) 
				}
			})
		}

		function login() {
			console.log("-=== Login User ===-")

			var data = {
				email: $scope.email,
				password: $scope.password
			}
			
			var jsonData = angular.toJson(data)
			
			vm.security.loginUser(jsonData).then(function(data) {
				console.log("-= server responded =-")
				console.log(data)
				if (data.errors == undefined) {
					console.log("-= success =-")
					updateCookie(data)
					ngDialog.closeAll()
				}
				else {
					console.log("-= error: " + data.errors.code + " | " + data.errors.msg)
					vm.userValid = false
				}
			})
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