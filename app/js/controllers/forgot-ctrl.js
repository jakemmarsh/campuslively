define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('forgotCtrl', ['$scope', 'authService', function ($scope, authService) {
    	$scope.sendEmail = function() {
    		var dataToSend = {
    			username: $scope.username
    		};

    		authService.forgotPassword(dataToSend).then(function (data) {
    			$scope.forgotError = null;
    			$scope.emailSent = true;
	        },
	        function (errorMessage) {
	        	$scope.forgotError = errorMessage;
	        });
    	};
    }]);
});