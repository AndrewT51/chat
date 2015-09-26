var myApp = angular.module('myApp',['ngRoute']);
var myFirebase = new Firebase('https://rickyDaddyChat.firebaseio.com/chat');
var chatter ;



myApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'mainCtrl',
			templateUrl: './views/main.html'
		})
		.when('/chat/',{
			controller: 'chatCtrl',
			templateUrl: './views/chat.html'

		})
		.when('/corrections/',{
			controller: 'mainCtrl',
			templateUrl: './views/corrections.html'

		})
		.otherwise({redirectTo: '/'});
});

myApp.controller('mainCtrl', function($scope){

	$scope.capitaliser = function(){

		$scope.NAME = $scope.name.toUpperCase();


	};

});


myApp.controller('chatCtrl', function($scope){
	$scope.fullChat =[];

	
		myFirebase.on('value',function(dataSnapshot){
			chatter = dataSnapshot.val() ? 'Person B' : 'Person A';
			console.log(chatter);
			console.log(dataSnapshot.val().chatter);
			$scope.mes = dataSnapshot.val().chatter;
			$scope.fullChat.push(dataSnapshot.val().chatter);

		})
		
		
	$scope.postMessage = function (){
		
		myFirebase.child('chatter').set($scope.message);
		// $scope.fullChat.push($scope.message);
		console.log($scope.fullChat);
		$scope.message= '';
		
	}

	});

