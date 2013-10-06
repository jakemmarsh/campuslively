define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerBusinessCtrl', function ($scope, userService) {
    	$scope.emailSent = false;

    	$scope.schools = ['Boston University', 'University of Maine'];

    	$scope.register = function() {
    		var newUser = {
    			type: 'business',
    			username: $scope.username,
    			password: $scope.password,
    			businessName: $scope.businessName,
    			email: $scope.email
    		};

    		userService.register(newUser).then(function (data, status) {
    			// TODO: send email
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.registerError = errorMessage;
	        });
    	};
    });
});