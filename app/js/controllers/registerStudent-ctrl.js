define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerStudentCtrl', ['$scope', '$modal', 'schoolService', 'authService', function ($scope, $modal, schoolService, authService) {
    	schoolService.getAllSchools().then(function (data) {
    		$scope.schools = data;
    	});

    	$scope.checkUsername = function() {
    		authService.checkUsername($scope.user.username).then(function (isTaken) {
    			if(isTaken === 'true') {
    				$scope.usernameTaken = true;
    			}
    			else {
    				$scope.usernameTaken = false;
    			}
    		});
    	};

    	$scope.checkEmail = function() {
    		if($scope.user.email) {
	    		authService.checkEmail($scope.user.email).then(function (isTaken) {
	    			if(isTaken === 'true') {
	    				$scope.emailTaken = true;
	    			}
	    			else {
	    				$scope.emailTaken = false;
	    			}
	    		});
	    	}
    	};

    	$scope.register = function(newUser) {
            // populate remaining fields
    		newUser.type = 'student';
            // make nonsensical location by default
            // TODO: fix this logic?
            newUser.loc = {
                type: 'Point',
                coordinates: [-180, -90]
            };

    		authService.register(newUser).then(function (data) {
    			$scope.usernameTaken = false;
    			$scope.emailTaken = false;
    			$scope.emailSent = true;
	        },
	        function() {
	        	$scope.registerError = "Failed to register new user.";
	        });
    	};

        $scope.openTerms = function() {
            var modalInstance = $modal.open({
                templateUrl: 'termsModal.html',
                controller: 'basicModalCtrl',
                resolve: {
                    items: null,
                    location: null,
                    event: null
                }
            });
        };
    }]);
});