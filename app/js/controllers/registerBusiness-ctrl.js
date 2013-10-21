define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerBusinessCtrl', function ($scope, authService, schoolService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    	});

    	$scope.checkUsername = function() {
    		authService.checkUsername($scope.user.username).then(function (isTaken, status) {
    			if(isTaken == 'true') {
    				$scope.usernameTaken = true;
    			}
    			else {
    				$scope.usernameTaken = false;
    			}
    		});
    	};

    	$scope.checkEmail = function() {
    		authService.checkEmail($scope.user.email).then(function (isTaken, status) {
    			if(isTaken == 'true') {
    				$scope.emailTaken = true;
    			}
    			else {
    				$scope.emailTaken = false;
    			}
    		});
    	};

    	$scope.register = function() {
    		$scope.user.type = 'business';

    		authService.register($scope.user).then(function (data, status) {
    			$scope.usernameTaken = false;
    			$scope.emailTaken = false;
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.registerError = errorMessage;
	        });
    	};
    });
});