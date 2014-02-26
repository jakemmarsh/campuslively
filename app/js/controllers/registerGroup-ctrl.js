define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerGroupCtrl', ['$scope', '$modal', 'authService', 'schoolService', function ($scope, $modal, authService, schoolService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    	});

    	$scope.checkUsername = function() {
    		authService.checkUsername($scope.user.username).then(function (isTaken, status) {
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
	    		authService.checkEmail($scope.user.email).then(function (isTaken, status) {
	    			if(isTaken === 'true') {
	    				$scope.emailTaken = true;
	    			}
	    			else {
	    				$scope.emailTaken = false;
	    			}
	    		});
	    	}
    	};

    	$scope.register = function() {
    		$scope.user.type = 'group';
            // make nonsensical location by default
            // TODO: fix this logic?
            $scope.user.loc = {
                type: 'Point',
                coordinates: [-180, -90]
            };

    		authService.register($scope.user).then(function (data, status) {
    			$scope.usernameTaken = false;
    			$scope.emailTaken = false;
    			$scope.emailSent = true;
	        },
	        function (errorMessage, status) {
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