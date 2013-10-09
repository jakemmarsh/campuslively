define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerBusinessCtrl', function ($scope, authService) {
    	$scope.schools = ['Boston University', 'University of Maine'];

    	$scope.register = function() {
    		var newUser = {
    			type: 'business',
    			username: $scope.username,
    			password: $scope.password,
    			businessName: $scope.businessName,
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