define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerStudentCtrl', function ($scope, userService) {
    	$scope.emailSent = false;

    	$scope.schools = ['Boston University', 'University of Maine'];

    	$scope.register = function() {
    		var newUser = {
    			type: 'student',
    			username: $scope.username,
    			password: $scope.password,
    			email: $scope.email,
    			firstName: $scope.firstName,
    			lastName: $scope.lastName,
    			gender: $scope.gender,
    			school: $scope.school
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