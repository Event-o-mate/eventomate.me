(function($){  
	'use strict'

	angular
		.module("EventoMate")
		.controller("MenuController", MenuController)

	function MenuController($scope, $http, $cookies, security, ngDialog) {
		var vm = this

		// Methods bindables
		vm.logout = logout
		vm.toggleRegister = toggleRegister
		vm.toggleLogin = toggleLogin

		//Properties
		vm.security = security


		// Bindables
		function logout() {
			clearCookie()
			vm.security.userValid = false
			$http.defaults.headers.common.Authorization = ""
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
		}

		function clearCookie() {
			var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 3);
			var userCookie = $cookies.getObject('userCookie')
			userCookie.valid = false
			userCookie.token = ''
			$cookies.putObject("userCookie", userCookie, {'expires': expireDate})
		}

	}
})()