(function($){  
	'use strict'

	angular
		.module("EventoMate")
		.controller("AuthenticationController", AuthenticationController)

	function AuthenticationController($scope, $cookies, $http, security, ngDialog) {
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
				name: $scope.email,
				email: $scope.password,
				password: $scope.name
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
					$http.defaults.headers.common.Authorization = "hash="+data.token
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
					$http.defaults.headers.common.Authorization = "hash="+data.token
					ngDialog.closeAll()
				}
				else {
					console.log("-= error: " + data.errors.code + " | " + data.errors.msg)
					vm.userValid = false
				}
			})
		}

		function updateCookie(data) {
			var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 3);
			var userCookie = $cookies.getObject('userCookie')
			userCookie.valid = true
			userCookie.token = data.token
			$cookies.putObject("userCookie", userCookie, {'expires': expireDate})
			vm.security.userValid = true
		}

	}
})()