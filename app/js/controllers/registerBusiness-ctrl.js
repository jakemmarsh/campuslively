define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerBusinessCtrl', function ($scope, authService) {
    	$scope.register = function() {
    		var newUser = {
    			type: 'business',
    			username: $scope.username,
    			password: $scope.password,
    			businessName: $scope.businessName,
    			businessDescription: $scope.businessDescription,
    			email: $scope.email
    		};

    		authService.register(newUser).then(function (data, status) {
    			// TODO: send email
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.registerError = errorMessage;
	        });
    	};
    });
});