'use strict'
var chatApp = angular.module('chatApp',['firebase','ui.router']);

chatApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');

	$stateProvider

		.state('login',{
			url: '/login',
			templateUrl: 'routes/views/login.html',
			controller: 'passwordCtrl'
		})

		.state('signup',{
			url: '/signup',
			templateUrl: 'routes/views/signup.html',
			controller: 'passwordCtrl'

		})



})

chatApp.controller('passwordCtrl',function($scope){
	var ref = new Firebase("https://rickydaddychat.firebaseio.com");
	$scope.submitNewDetails = function(user){
		if (user.pWord1 === user.pWord2){
			ref.createUser({
			  email    : user.eMail,
			  password : user.pWord1
			}, 
			function(error, userData) {
				if (error) {
			  	console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			  }
			});
		} else {
			console.log('passwords do not match');
		}
	}

	$scope.logIn = function(user){
		console.log(user);


		ref.authWithPassword({
		  email    : user.eMail,
		  password : user.pWord
		}, function(error, authData) {
	  	console.log('ok');
		  if (error) {
		  	$scope.user.eMail = '';
		    console.log("Login failed!", error);
		  } else {
		  	$scope.user.eMail = '';
		    console.log("Authenticated successfully with payload:", authData);
		  }
		  
		});
		// return {
		//   email    : user.eMail,
		//   password : user.pWord
		// }, function(error, authData) {
		//   if (error) {
		//     console.log("Login Failed!", error);
		//   } else {
		//     console.log("Authenticated successfully with payload:", authData);
		//   }
	 //  }
	};

})


