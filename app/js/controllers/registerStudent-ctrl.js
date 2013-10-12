define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerStudentCtrl', function ($scope, schoolService, authService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    		console.log(errorMessage);
    	});

    	$scope.checkUsername = function() {
    		authService.checkUsername($scope.username).then(function (isTaken, status) {
    			if(isTaken == 'true') {
    				console.log('username taken');
    				$scope.usernameTaken = true;
    			}
    			else {
    				$scope.usernameTaken = false;
    			}
    		});
    	};

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
    			$scope.usernameTaken = false;
    			// TODO: send email
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
	        	$scope.registerError = "Failed to register new user.";
	        });
    	};
    });
});