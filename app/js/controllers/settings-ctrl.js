define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('settingsCtrl', function ($scope, $rootScope, $modal, userService, schoolService, authService) {
    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    	});

    	$scope.userSchool = $rootScope.user.school;

    	if($rootScope.user.type == 'student') {
    		$scope.userFirstName = $rootScope.user.firstName;
    		$scope.userLastName = $rootScope.user.lastName;
    		$scope.userEmailStudent = $rootScope.user.email;
    	}
    	else if($rootScope.user.type == 'business') {
    		$scope.userBusinessName = $rootScope.user.businessName;
    		$scope.userBusinessDescription = $rootScope.user.businessDescription;
    		$scope.userEmailBusiness = $rootScope.user.email;
    	}

    	if($scope.userSchool) {
	    	$scope.schoolSelectOptions = {
	    		'val': $scope.userSchool.name
	    	};
	    }

	    $scope.checkEmail = function() {
	    	if($scope.userEmailStudent) {
		    	if($scope.userEmailStudent.length > 0 && $scope.userEmailStudent !== $rootScope.user.email) {
		    		authService.checkEmail($scope.userEmailStudent).then(function (isTaken, status) {
		    			if(isTaken == 'true') {
		    				$scope.emailTaken = true;
		    			}
		    			else {
		    				$scope.emailTaken = false;
		    			}
		    		});
		    	}
		    }
	    	else if($scope.userEmailBusiness) {
	    		if($scope.userEmailBusiness.length > 0 && $scope.userEmailBusiness !== $rootScope.user.email) {
		    		authService.checkEmail($scope.userEmailBusiness).then(function (isTaken, status) {
		    			if(isTaken == 'true') {
		    				$scope.emailTaken = true;
		    			}
		    			else {
		    				$scope.emailTaken = false;
		    			}
		    		});
	    		}
	    	}
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
				if($rootScope.user.school !== $scope.userSchool && $scope.userSchool) {
					updateParams.school = $scope.userSchool;
				}
				if($rootScope.user.firstName !== $scope.userFirstName && $scope.userFirstName.length > 0) {
					updateParams.firstName = $scope.userFirstName;
				}
				if($rootScope.user.lastName !== $scope.userLastName && $scope.userLastName.length > 0) {
					updateParams.lastName = $scope.userLastName;
				}
				if($rootScope.user.email !== $scope.userEmailStudent && $scope.userEmailStudent.length > 0) {
					updateParams.email = $scope.userEmailStudent;
				}
			}
			else if($rootScope.user.type == 'business') {
				if($rootScope.user.businessName !== $scope.userBusinessName && $scope.userBusinessName.length > 0) {
					updateParams.businessName = $scope.userBusinessName;
				}
				if($rootScope.user.businessDescription !== $scope.userBusinessDescription && $scope.userBusinessDescription.length > 0) {
					updateParams.businessDescription = $scope.userBusinessDescription;
				}
				if($rootScope.user.email !== $scope.userEmailBusiness && $scope.userEmailBusiness.length > 0) {
					updateParams.email = $scope.userEmailBusiness;
				}
			}
			if($scope.userPassword) {
				if($scope.userPassword.length > 0) {
					updateParams.password = $scope.userPassword;
				}
			}

			if($scope.newUserImage) {
				userService.uploadImage($scope.newUserImage.file, $rootScope.user._id).then(function (data, status) {
					var getExtension = function(filename) {
					    var i = filename.lastIndexOf('.');
		    			return (i < 0) ? '' : filename.substr(i);
					};
	                $scope.saveError = null;
	                updateParams.pictureUrl = 'https://s3.amazonaws.com/campuslively/user_imgs/' + $rootScope.user._id + getExtension($scope.newUserImage.file.name);
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
				if($.isEmptyObject(updateParams)) {
					$scope.saveError = "You haven't made any changes!"
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