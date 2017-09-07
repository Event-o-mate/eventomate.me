(function($){  
	'use strict';

	angular
		.module("EventoMate")
		.controller("MenuController", MenuController)

	function MenuController($scope, $http, $cookies, $location, security, ngDialog, User) {
		var vm = this

		// Methods bindables
		vm.logout = logout
		vm.toggleRegister = toggleRegister
		vm.toggleLogin = toggleLogin
		vm.openProfile = openUserProfile
		vm.saveUserProfile = saveUserProfile
		vm.changeUserPassword = changeUserPassword

		//ngDialog patch
		$scope.toggleRegister = vm.toggleRegister

		//Properties
		vm.security
		vm.userProfileOpen
		vm.user
		vm.userName
		vm.userEmail
		vm.userPassword
		vm.newUserPassword
		vm.confirmUserPassword
		vm.displaySuccess
		vm.displayError

		init()

		function init() {
			vm.security = security
			vm.userProfileOpen = false
			vm.user = User
			vm.displaySuccess = false
			vm.displayError = false
		}

		// Bindables
		function logout() {
			clearCookie()
			vm.security.userValid = false
			$http.defaults.headers.common.Authorization = ""
			$location.path("/")
			vm.userProfileOpen = false
		}

		function toggleRegister() {
			ngDialog.open({
				template: 'registerDialog',
				controller: "AuthenticationController"
			})
			.closePromise.then(function(){
				if (vm.security.userValid) {
					$location.path("/dashboard")
				}
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

				if (vm.security.userValid) {
					$location.path("/dashboard")
				}
			});
		}

		function openUserProfile() {
			
			vm.user.account.get(function(response){
				vm.userEmail = response.data.email
				vm.userName = response.data.name
			}, function(error){
				console.log(error)
			})

			vm.userProfileOpen = !vm.userProfileOpen
		}

		function clearCookie() {
			var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 3);
			var userCookie = $cookies.getObject('userCookie')
			userCookie.valid = false
			userCookie.token = null
			userCookie.user_id = 0
			userCookie.email = null
			$cookies.putObject("userCookie", userCookie, {'expires': expireDate})
		}

		function saveUserProfile() {
			var userId = security.userId()
			var userData = {
				"name": vm.userName,
				"email": vm.userEmail
			}
			vm.user.account.update(userId, userData, function(response){
				vm.displaySuccess = true
			}, function(error){
				console.log(error)
				vm.displayError = true
			})
		}

		function changeUserPassword() {
			var userData = {
				"email": vm.userEmail,
				"password": vm.userPassword,
				"new_password": vm.newUserPassword
			}
			vm.user.changePassword(userData, function(response){
				if (response.data.password_changed) {
					console.log("password updated!")
					vm.userPassword = null
					vm.newUserPassword = null 
					vm.confirmUserPassword = null 
				}
			}, function(error){
				console.log(error)
			})
		}

	}
})()