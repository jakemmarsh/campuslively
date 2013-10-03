define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('loginCtrl', function ($scope, $rootScope, $location, userService) {
    	$scope.login = function() {
    		userService.loggedIn = true;
    		// redirect to original destination if one exists
    		if(userService.getOriginalDestination()) {
    			var originalDestination = userService.getOriginalDestination();
    			userService.originalDestination = null;

    			$location.path(originalDestination);
    		}
    		else {
    			$location.path('/feed');
    		}
    	}
    });
});