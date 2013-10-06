define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('forgotCtrl', function ($scope, userService) {
    	$scope.sendEmail = function() {
    		var dataToSend = {
    			username: $scope.username
    		};

    		userService.forgotPassword(dataToSend).then(function (data, status) {
    			$scope.forgotError = null;
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.forgotError = errorMessage;
	        });
    	};
    });
});