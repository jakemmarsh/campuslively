define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('settingsCtrl', function ($scope, $rootScope, $modal, userService, schoolService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    		console.log(errorMessage);
    	});

    	$scope.userEmail = $rootScope.user.email;
    	$scope.userSchool = $rootScope.user.school;

    	if($rootScope.user.type == 'student') {
    		$scope.userFirstName = $rootScope.user.firstName;
    		$scope.userLastName = $rootScope.user.lastName;
    	}

    	$scope.schoolSelectOptions = {
    		'val': $scope.userSchool.name
    	};

    	$scope.open = function (modal) {
		  	if (modal.toLowerCase() == 'twitter') {
			    var modalInstance = $modal.open({
			      templateUrl: 'twitterModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
			else if (modal.toLowerCase() == 'facebook') {
				var modalInstance = $modal.open({
			      templateUrl: 'facebookModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
		};

		$scope.saveChanges = function() {
			var updateParams = {};
			// populate updateParams with any changed fields
			if($rootScope.user.type == 'student') {
				if($rootScope.user.school !== $scope.userSchool) {
					updateParams.school = $scope.userSchool;
				}
				if($rootScope.user.firstName !== $scope.userFirstName && $scope.userFirstName.length > 0) {
					updateParams.firstName = $scope.userFirstName;
				}
				if($rootScope.user.lastName !== $scope.userLastName && $scope.userLastName.length > 0) {
					updateParams.lastName = $scope.userLastName;
				}
				if($scope.userPassword) {
					if($scope.userPassword.length > 0) {
						updateParams.password = $scope.userPassword;
					}
				}
			}
			else if($rootScope.user.type == 'business') {
				if($rootScope.user.businessName !== $scope.userBusinessName && $scope.userBusinessName.length > 0) {
					updateParams.businessName = $scope.userBusinessName;
				}
			}
			if($rootScope.user.email !== $scope.userEmail && $scope.userEmail.length > 0) {
				updateParams.email = $scope.userEmail;
			}
			if($scope.userPassword) {
				if($scope.userPassword.length > 0) {
					updateParams.password = $scope.userPassword;
				}
			}

			if($scope.newUserImage) {
				userService.uploadImage($scope.newUserImage.resized, $rootScope.user._id).then(function (data, status) {
	                $scope.saveError = null;
	                userService.updateUser($rootScope.user._id, updateParams).then(function (data, status) {
						$scope.changesSaved = true;
						$rootScope.user = data;
					},
					function (errorMessage, status) {
						$scope.changesSaved = false;
						$scope.saveError = "Error occurred while saving changes.";
					});
	            },
	            function (errorMessage, status) {
	            	$scope.changesSaved = false;
	                $scope.saveError = "Error occurred while uploading image.";
	            });
			}
			else {
				userService.updateUser($rootScope.user._id, updateParams).then(function (data, status) {
					$scope.changesSaved = true;
					$rootScope.user = data;
				},
				function (errorMessage, status) {
					$scope.changesSaved = false;
					$scope.saveError = "Error occurred while saving changes.";
				});
			}
		};

		$scope.removeSubscription = function(subscriptionId) {
			userService.unsubscribe($rootScope.user._id, subscriptionId).then(function (data, status) {
                $rootScope.user = data;
            },
            function (errorMessage, status) {
                $scope.unsubscribeError = "Error occurred while unsubscribing from user.";
            });
		}
    });
});