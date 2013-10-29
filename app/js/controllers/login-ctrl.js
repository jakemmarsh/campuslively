define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authService', 'localStorageService', function ($scope, $rootScope, $location, authService, localStorageService) {
    	$scope.login = function() {
    		var user = {
    			username: $scope.username,
    			password: $scope.password
    		};

    		authService.login(user).then(function (data, status) {
    			$scope.showResend = false;
    			$scope.emailResent = false;
    			$scope.loginError = null;
    			$rootScope.user = data;
                localStorageService.add('user', data);
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
	        	if(errorMessage.toLowerCase().indexOf('activate') !== -1) {
	        		$scope.showResend = true;
	        		$scope.emailResent = false;
	        	}
	        	else {
	        		$scope.emailResent = false;
	        		$scope.showResend = false;
	        		$scope.loginError = errorMessage;
	        	}
	        });
    	};

    	$scope.resendActivation = function(username) {
    		authService.resendActivation(username).then(function (data, status) {
    			$scope.emailResent = true;
    		}, function (errorMessage, status) {
    			$scope.emailResent = false;
    			$scope.showResend = false;
    			$scope.loginError = errorMessage;
    		});
    	}
    }]);
});