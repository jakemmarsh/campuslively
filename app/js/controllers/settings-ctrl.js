define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('settingsCtrl', ['$scope', '$rootScope', '$modal', 'userService', 'schoolService', 'authService', 'locationService', '$FB', 'localStorageService', '$q', 'googleService', function ($scope, $rootScope, $modal, userService, schoolService, authService, locationService, $FB, localStorageService, $q, googleService) {
    	var updateParams = {};

    	schoolService.getAllSchools().then(function (data) {
    		$scope.schools = data;
    	});

    	$scope.userSchool = $rootScope.user.school._id;
    	$scope.userFacebookLink = $rootScope.user.facebookLink;
    	$scope.userTwitterLink = $rootScope.user.twitterLink;

    	if($rootScope.user.type === 'student') {
    		$scope.userFirstName = $rootScope.user.firstName;
    		$scope.userLastName = $rootScope.user.lastName;
    		$scope.userEmailStudent = $rootScope.user.email;
    	}
    	else if($rootScope.user.type === 'group') {
    		$scope.userGroupName = $rootScope.user.groupName;
    		$scope.userGroupDescription = $rootScope.user.groupDescription;
    		$scope.userEmailGroup = $rootScope.user.email;
    		$scope.locationAddress = $rootScope.user.address;
    		$scope.websiteAddress = $rootScope.user.website;
    	}

    	if($scope.userSchool) {
	    	$scope.schoolSelectOptions = {
	    		'val': $scope.userSchool.name
	    	};
	    }

	    $scope.usingFacebookImage = function() {
	    	if($rootScope.user.pictureUrl.indexOf('facebook') > -1) {
	    		return true;
	    	}
	    	else {
	    		return false;
	    	}
	    };

	    $scope.usePageForImage = function() {
	    	if($scope.picturePage) {
	    		$scope.newUserImage = {};
	    		$scope.newUserImage.url = 'http://graph.facebook.com/' + $scope.picturePage + '/picture?width=250&height=250';
	    		updateParams.pictureUrl = 'http://graph.facebook.com/' + $scope.picturePage + '/picture?width=250&height=250';
	    	}
	    };

	    $scope.useFacebookImage = function() {
	    	$scope.newUserImage = {};
	    	$scope.newUserImage.url = 'http://graph.facebook.com/' + $rootScope.fbMe.id + '/picture?width=250&height=250';
	    	updateParams.pictureUrl = 'http://graph.facebook.com/' + $rootScope.fbMe.id + '/picture?width=250&height=250';
	    };

	    $scope.checkEmail = function() {
	    	if($scope.userEmailStudent) {
		    	if($scope.userEmailStudent.length > 0 && $scope.userEmailStudent !== $rootScope.user.email) {
		    		authService.checkEmail($scope.userEmailStudent).then(function (isTaken) {
		    			if(isTaken === 'true') {
		    				$scope.emailTaken = true;
		    			}
		    			else {
		    				$scope.emailTaken = false;
		    			}
		    		});
		    	}
		    }
	    	else if($scope.userEmailGroup) {
	    		if($scope.userEmailGroup.length > 0 && $scope.userEmailGroup !== $rootScope.user.email) {
		    		authService.checkEmail($scope.userEmailGroup).then(function (isTaken) {
		    			if(isTaken === 'true') {
		    				$scope.emailTaken = true;
		    			}
		    			else {
		    				$scope.emailTaken = false;
		    			}
		    		});
	    		}
	    	}
	    };

	    // attempt to get latitude and longitude as address is entered
	    $scope.checkAddress = function() {
	    	if($scope.locationAddress) {
		    	locationService.checkAddress($scope.locationAddress.split(' ').join('+')).then(function (data) {
					if(data) {
			    		if(data.results.length > 0) {
			    			$scope.loc = {
			    				type: 'Point',
				    			coordinates: [data.results[0].geometry.location.lng.toFixed(2), data.results[0].geometry.location.lat.toFixed(2)]
			    			};
			    		}
			    	}
				},
				function (errorMessage) {
		        });
		    }
	    };

		$scope.fbLogin = function() {
			var updateParams = {},
				fbSubscriptions = [],
				managedPages = [];
			if($rootScope.user.type === 'student') {
				$FB.login(function (res) {
					if (res.authResponse) {
						$rootScope.updateFbStatus($rootScope.updateApiMe);
						$rootScope.updateApiMe();
						updateParams.facebook = {};
						updateParams.facebook.id = res.authResponse.userID;
						updateParams.facebook.linked = true;
						updateParams.facebookLink = res.authResponse.userID;
						updateParams.facebook.autoPost = true;
						$q.all([
                            $FB.api('/me/likes', {limit: 9999, fields: 'id'}),
                            $FB.api('/me/subscribedto', {limit: 9999, fields: 'id'})
                        ])
                        .then(function (rsvList) {
                            // result of api('/me/likes')
                            for(var i = 0; i < rsvList[0].data.length; i++) {
                                fbSubscriptions.push(rsvList[0].data[i].id);
                            }

                            // result of api('/me/subscribedto')
                            for(var j = 0; j < rsvList[1].data.length; j++) {
                                fbSubscriptions.push(rsvList[1].data[j].id);
                            }
                            updateParams.facebook.subscriptions = fbSubscriptions;
                            updateParams.pictureUrl = 'http://graph.facebook.com/' + res.authResponse.userID + '/picture?width=250&height=250';
							userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
								userService.addFacebookSubscriptions($rootScope.user._id).then(function (data) {
									$rootScope.user = data;
									localStorageService.add('user', data);
								});
							});
                        });
					}
				}, {scope: 'user_subscriptions,user_likes,publish_stream,publish_actions'});
			}
			else if ($rootScope.user.type === 'group') {
				$FB.login(function (res) {
					if (res.authResponse) {
						$rootScope.updateFbStatus($rootScope.updateApiMe);
						$rootScope.updateApiMe();
						updateParams.facebook = {};
						updateParams.facebook.id = res.authResponse.userID;
						updateParams.facebook.linked = true;
						updateParams.facebook.autoPost = false;
						$q.all([
                            $FB.api('/me/likes', {limit: 9999, fields: 'id'}),
                            $FB.api('/me/subscribedto', {limit: 9999, fields: 'id'}),
                            $FB.api('/me/accounts', {limit: 9999, fields: 'name,id'})
                        ])
                        .then(function (rsvList) {
                            // result of api('/me/likes')
                            for(var i = 0; i < rsvList[0].data.length; i++) {
                                fbSubscriptions.push(rsvList[0].data[i].id);
                            }
                            // result of api('/me/subscribedto')
                            for(var j = 0; j < rsvList[1].data.length; j++) {
                                fbSubscriptions.push(rsvList[1].data[j].id);
                            }
                            updateParams.facebook.subscriptions = fbSubscriptions;

                            // result of api('/me/accounts')
                            for(var k = 0; k < rsvList[2].data.length; k++) {
                            	managedPages.push(rsvList[2].data[k]);
                            }
                            updateParams.facebook.managedPages = managedPages;
							userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
								$rootScope.user = data;
								localStorageService.add('user', data);
							});
                        });
					}
				}, {scope: 'user_subscriptions,user_likes,publish_stream,publish_actions,manage_pages'});
			}
		};

		$scope.changeFbAutoPost = function() {
			var updateParams = {};
			updateParams.facebook = {};
			updateParams.facebook.id = $rootScope.user.facebook.id;
			updateParams.facebook.lastUpdated = $rootScope.user.facebook.lastUpdated;
			updateParams.facebook.linked = true;
			updateParams.facebook.subscriptions = $rootScope.user.facebook.subscriptions;
			updateParams.facebook.managedPages = $rootScope.user.facebook.managedPages;
			updateParams.facebook.autoPost = $rootScope.user.facebook.autoPost;
			updateParams.facebook.lastReminded = $rootScope.user.facebook.lastReminded;

			// get value from checkbox

			userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
				$rootScope.user = data;
				localStorageService.add('user', data);
			});
		};

		$scope.fbLogout = function() {
			var updateParams = {};
			updateParams.facebook = {
				id: null,
				subscriptions: null,
				managedPages: null,
				autoPost: null,
				lastReminded: $rootScope.user.facebook.lastReminded
			};
			updateParams.pictureUrl = 'http://s3.amazonaws.com/campuslively/user_imgs/default.png';
			updateParams.facebookLink = null;

			// update user in database before making Facebook API call
			userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
				$rootScope.user = data;
				$rootScope.user.facebookLink = null;
				localStorageService.add('user', data);
				$FB.logout(function () {
					$rootScope.updateFbStatus($rootScope.updateApiMe);
				});
			});
		};

		$scope.googleLogin = function() {
			var updateParams = {};
			// login to Google API
            googleService.login().then(function (data) {
            	updateParams.google = {};
            	updateParams.google.id = data.id;
            	// get user's Google Calendar ID
            	googleService.getUserCalendar().then(function (data) {
            		updateParams.google.calendarId = data;

            		// update user's account
            		userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
						$rootScope.user = data;
						localStorageService.add('user', data);
						console.log($rootScope.user);
					});
	            });
            });
        };

        $scope.googleLogout = function() {
        	var updateParams = {};
        	updateParams.google = {};
        	updateParams.google.id = null;
        	userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
				$rootScope.user = data;
				localStorageService.add('user', data);
			});
        };

		$scope.saveChanges = function() {
			var toTitleCase = function(str) {
    				return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				};

			// populate updateParams with any changed fields
			if($rootScope.user.type === 'student') {
				if($rootScope.user.firstName !== $scope.userFirstName && $scope.userFirstName.length > 0) {
					updateParams.firstName = $scope.userFirstName;
					if($scope.userLastName) {
						updateParams.displayName = $scope.userFirstName + ' ' + $scope.userLastName;
					}
					else {
						updateParams.displayName = $scope.userFirstName + ' ' + $rootScope.user.lastName;
					}
				}
				if($rootScope.user.lastName !== $scope.userLastName && $scope.userLastName.length > 0) {
					updateParams.lastName = $scope.userLastName;
					if($scope.userFirstName) {
						updateParams.displayName = $scope.userFirstName + ' ' + $scope.userLastName;
					}
					else {
						updateParams.displayName = $rootScope.user.firstName + ' ' + $rootScope.userLastName;
					}
				}
				if($rootScope.user.email !== $scope.userEmailStudent && $scope.userEmailStudent.length > 0) {
					updateParams.email = $scope.userEmailStudent;
				}
			}
			else if($rootScope.user.type === 'group') {
				if($rootScope.user.groupName !== $scope.userGroupName && $scope.userGroupName.length > 0) {
					updateParams.groupName = $scope.userGroupName;
					updateParams.displayName = $scope.userGroupName;
				}
				if($rootScope.user.groupDescription !== $scope.userGroupDescription) {
					updateParams.groupDescription = $scope.userGroupDescription;
				}
				if($rootScope.user.email !== $scope.userEmailGroup && $scope.userEmailGroup.length > 0) {
					updateParams.email = $scope.userEmailGroup;
				}
				if($scope.loc) {
					updateParams.loc = $scope.loc;
				}
				if($scope.locationAddress !== $rootScope.user.address && $scope.locationAddress.length > 0) {
					updateParams.address = toTitleCase($scope.locationAddress);
				}
				if($scope.picturePage) {
					updateParams.pictureUrl = 'http://graph.facebook.com/' + $scope.picturePage + '/picture?width=250&height=250';
				}
				if($scope.websiteAddress && $scope.websiteAddress !== $rootScope.user.website) {
					if($scope.websiteAddress.indexOf('http://') === -1 && $scope.websiteAddress.indexOf('https://') === -1) {
						$scope.websiteAddress = 'http://' + $scope.websiteAddress;
					}
					updateParams.website = $scope.websiteAddress;
				}
				else if(!$scope.websiteAddress) {
					updateParams.website = null;
				}
			}
			if($scope.userFacebookLink && $scope.userFacebookLink !== $rootScope.user.facebookLink) {
				updateParams.facebookLink = $scope.userFacebookLink;
			}
			else if(!$scope.userFacebookLink) {
				updateParams.facebookLink = null;
			}

			if($scope.userTwitterLink !== $rootScope.user.twitterLink) {
				updateParams.twitterLink = $scope.userTwitterLink.replace('@', '');
			}
			if($scope.userPassword) {
				if($scope.userPassword.length > 0) {
					updateParams.password = $scope.userPassword;
				}
			}
			if($rootScope.user.school !== $scope.userSchool && $scope.userSchool) {
				updateParams.school = $scope.userSchool;
			}

			if($scope.newUserImage) {
				// verify that uploaded file is of type "image/x"
				if($scope.newUserImage.file.type.toLowerCase().indexOf("image") === -1) {
					$scope.saveError = "Your account picture must be an image.";
					return;
				}
				// verify that uploaded file is no larger than 3MB
				else if($scope.newUserImage.file.size > 3145728) {
					$scope.saveError = "That image is too large.";
					return;
				}
				userService.uploadImage($scope.newUserImage.file, $rootScope.user._id).then(function (data) {
					var getExtension = function(filename) {
					    var i = filename.lastIndexOf('.');
		    			return (i < 0) ? '' : filename.substr(i);
					};
	                $scope.saveError = null;
	                updateParams.pictureUrl = 'https://s3.amazonaws.com/campuslively/user_imgs/' + $rootScope.user._id + getExtension($scope.newUserImage.file.name);
	                userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
	                	$scope.emailTaken = false;
						$scope.changesSaved = true;
						$rootScope.user = data;
						localStorageService.add('user', data);
					},
					function() {
						$scope.emailTaken = false;
						$scope.changesSaved = false;
						$scope.saveError = "Error occurred while saving changes.";
						return;
					});
	            },
	            function() {
	            	$scope.emailTaken = false;
	            	$scope.changesSaved = false;
	                $scope.saveError = "Error occurred while uploading image.";
	            });
			}
			else {
				if($.isEmptyObject(updateParams)) {
					$scope.saveError = "You haven't made any changes!"
					return;
				}
				else {
					userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
						$scope.emailTaken = false;
						$scope.changesSaved = true;
						$rootScope.user = data;
						localStorageService.add('user', data);
					},
					function() {
						$scope.emailTaken = false;
						$scope.changesSaved = false;
						$scope.saveError = "Error occurred while saving changes.";
						return;
					});
				}
			}
		};

		$scope.openExplanation = function() {
			var modalInstance = $modal.open({
				templateUrl: 'explanationModal.html',
				controller: 'basicModalCtrl',
				resolve: {
					items: null,
					location: null,
					event: null
				}
			});
      	};

      	$scope.openDelete = function() {
			var modalInstance = $modal.open({
				templateUrl: 'deleteModal.html',
				controller: 'basicModalCtrl',
				resolve: {
					items: null,
					location: null,
					event: null
				}
			});
      	};

		$scope.removeSubscription = function(subscriptionId) {
			userService.unsubscribe($rootScope.user._id, subscriptionId).then(function (data) {
                $rootScope.user = data;
                localStorageService.add('user', data);
            },
            function() {
                $scope.unsubscribeError = "Error occurred while unsubscribing from user.";
            });
		}
    }]);
});