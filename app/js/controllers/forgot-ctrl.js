define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('forgotCtrl', ['$scope', 'authService', function ($scope, authService) {
    	$scope.sendEmail = function() {
    		var dataToSend = {
    			username: $scope.username
    		};

    		authService.forgotPassword(dataToSend).then(function (data, status) {
    			$scope.forgotError = null;
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.forgotError = errorMessage;
	        });
    	};
    }]);
});