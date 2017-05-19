(function(){  
  'use strict'

  angular
    .module("EventoMate")
    .factory('User', User);

  function User($http, security) {

  	var service = {
      get:    getUser,
      create: createUser,
      update: updateUser,
      account: {
        get:    getAccount,
        update: updateAccount,
      } 
  	}

    var url = {
      root: "/api/users/",
      account: "/api/users/" + security.userId() + "/account"
    }

    var method = {
      get:    "GET",
      post:   "POST",
      put:    "PUT",
      delete: "DELETE"
    }

    function updateUser(id) {

    }

    function updateAccount(id, data) {

    }

  }

})()