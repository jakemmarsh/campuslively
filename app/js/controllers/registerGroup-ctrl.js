define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerGroupCtrl', ['$scope', '$modal', 'authService', 'schoolService', function ($scope, $modal, authService, schoolService) {
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
    		if($scope.user.email.length > 0) {
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
    		newUser.type = 'group';
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
	        function (errorMessage) {
	        	$scope.registerError = errorMessage;
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