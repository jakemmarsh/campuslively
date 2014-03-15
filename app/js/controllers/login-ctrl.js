define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authService', 'localStorageService', 'interceptorService', function ($scope, $rootScope, $location, authService, localStorageService, interceptorService) {
    	$scope.login = function() {
    		var user = {
    			username: $scope.username,
    			password: $scope.password
    		};

    		authService.login(user).then(function (data) {
    			$scope.showResend = false;
    			$scope.emailResent = false;
    			$scope.loginError = null;
    			$rootScope.user = data;
                localStorageService.add('user', data);
                interceptorService.loginConfirmed();
	        },
	        function (errorMessage) {
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
    		authService.resendActivation(username).then(function (data) {
    			$scope.emailResent = true;
    		}, function (errorMessage) {
    			$scope.emailResent = false;
    			$scope.showResend = false;
    			$scope.loginError = errorMessage;
    		});
    	};
    }]);
});