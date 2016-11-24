(function($){  
	'use strict'

	angular
		.module("EventoMate")
		.controller("MenuController", MenuController)

	function MenuController($http, $cookies, security) {
		var vm = this

		// Methods bindables
		vm.register = register
		vm.login = login
		vm.logout = logout
		vm.toggleRegister = toggleRegister
		vm.toggleLogin = toggleLogin
		vm.userValid = false
		vm.registerInProgress = false
		vm.loginInProgress = false 

		//Properties
		vm.email 		= ""
		vm.password = ""
		vm.name			= ""

		// Bindables
		function register() {
			console.log("-=== Register User ===-")
			vm.registerInProgress = true
			var data = {
				name: vm.name,
				email: vm.email,
				password: vm.password
			}
			console.log("-= with data")
			console.log(data)

			var jsonData = angular.toJson(data)

			security.registerUser(jsonData)
				.then(function(data){
					console.log("-= server responded =-")
					console.log(data)	

					if (data.errors == undefined) {
						console.log("-= success =-")
						$cookies.put("userValid", true) 
						$cookies.put("token", data.token)
						vm.userValid = true
						vm.registerInProgress = false
						$http.defaults.headers.common.Authorization = "hash="+data.token
					}
					else {
						console.log("-= error: " + data.errors.code + " | " + data.errors.msg)
						vm.userValid = false
					}
				})
		}

		function login() {
			console.log("-=== Login User ===-")
			
			var data = {
				email: vm.email,
				password: vm.password
			}
			
			var jsonData = angular.toJson(data)
			
			security.loginUser(jsonData)
				.then(function(data){
					console.log("-= server responded =-")
					console.log(data)
					vm.authInProgress = false
					if (data.errors == undefined) {
						console.log("-= success =-")
						vm.userValid = true
						vm.loginInProgress = false
						$http.defaults.headers.common.Authorization = "hash="+data.token
					}
					else {
						console.log("-= error: " + data.errors.code + " | " + data.errors.msg)
						vm.userValid = false
					}
					
				})
		}

		function logout() {
			vm.email = ""
			vm.password = ""
			vm.userValid = false
			$cookies.put("userValid", vm.userValid)
			$cookies.remove("token")
			$http.defaults.headers.common.Authorization = "hash="
		}

		function toggleRegister() {
			vm.registerInProgress = !vm.registerInProgress
			vm.loginInProgress = false
		}

		function toggleLogin() {
			vm.loginInProgress = !vm.loginInProgress
			vm.registerInProgress = false
		}

	}
})()