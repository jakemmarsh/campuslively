define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerStudentCtrl', function ($scope, schoolService, authService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = [];
    		for(var i = 0; i < data.length; i++) {
    			$scope.schools.push(data[i].name);
    		}
    	}, function(errorMessage, status) {

    	});

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