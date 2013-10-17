define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerBusinessCtrl', function ($scope, authService, schoolService) {
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
    			type: 'business',
    			username: $scope.username,
    			password: $scope.password,
    			businessName: $scope.businessName,
    			businessDescription: $scope.businessDescription,
    			school: $scope.school,
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