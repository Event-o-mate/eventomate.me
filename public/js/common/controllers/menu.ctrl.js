(function($){  
	'use strict'

	angular
		.module("EventoMate")
		.controller("MenuController", MenuController)

	function MenuController($scope, $http, $cookies, $location, security, ngDialog) {
		var vm = this

		// Methods bindables
		vm.logout = logout
		vm.toggleRegister = toggleRegister
		vm.toggleLogin = toggleLogin

		//ngDialog patch
		$scope.toggleRegister = vm.toggleRegister

		//Properties
		vm.security

		init()

		function init() {
			vm.security = security
		}

		// Bindables
		function logout() {
			clearCookie()
			vm.security.userValid = false
			$http.defaults.headers.common.Authorization = ""
			$location.path("/")
		}

		function toggleRegister() {
			ngDialog.open({
				template: 'registerDialog',
				controller: "AuthenticationController"
			})
		}

		function toggleLogin() {
			ngDialog.open({
				template: 'loginDialog',
				controller: "AuthenticationController"
			})
			.closePromise.then(function (data) {
				if (data.value == "register") {
					toggleRegister()
				}
			});
		}

		function clearCookie() {
			var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 3);
			var userCookie = $cookies.getObject('userCookie')
			userCookie.valid = false
			userCookie.token = ''
			userCookie.user_id = 0
			userCookie.email = null
			$cookies.putObject("userCookie", userCookie, {'expires': expireDate})
		}

	}
})()