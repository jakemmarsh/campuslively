define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('loginCtrl', function ($scope, $rootScope, $location, authService) {
    	$scope.login = function() {
    		var user = {
    			username: $scope.username,
    			password: $scope.password
    		};

    		authService.login(user).then(function (data, status) {
    			$scope.loginError = null;
    			$rootScope.user = data;
	    		// redirect to original destination if one exists
	    		if($rootScope.originalDestination) {
	    			var originalDestination = $rootScope.originalDestination;
	    			$rootScope.originalDestination = null;

	    			$location.path(originalDestination);
	    		}
	    		else {
	    			$location.path('/feed');
	    		}
	        },
	        function (errorMessage, status) {
	        	$scope.loginError = "Username or password incorrect.";
	        });
    	};
    });
});