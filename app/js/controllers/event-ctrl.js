define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', ['$scope', '$rootScope', '$modal', 'eventService', 'userService', 'resolvedEvent', '$location',  function ($scope, $rootScope, $modal, eventService, userService, resolvedEvent, $location) {
    	$scope.event = resolvedEvent;

    	// check to see if event has a legitimate location
    	$scope.hasLocation = ($scope.event.loc && ($scope.event.loc.coordinates[0] !== -180 || $scope.event.loc.coordinates[1] !== -90));

    	if(new Date($scope.event.startDate) < new Date()) {
    		$scope.eventPassed = true;
    	}

    	if($scope.hasLocation) {
	    	$scope.mapOptions = {
				center: new google.maps.LatLng($scope.event.loc.coordinates[1], $scope.event.loc.coordinates[0]),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				disableDoubleClickZoom: true,
				draggable: false,
				scrollwheel: false,
				panControl: false
		    };

		    $scope.placeMarker = function() {
				var contentString = '<h3 class="flush">'+$scope.event.locationName+'</h3>'+
									'<a href="https://maps.google.com/maps?daddr='+$scope.event.loc.coordinates[1]+','+$scope.event.loc.coordinates[0]+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
									'target="_blank" class="block">Get Directions</a>',
				
				locationMarker = new google.maps.InfoWindow({
					content: contentString,
					maxWidth: 300,
					position: new google.maps.LatLng($scope.event.loc.coordinates[1], $scope.event.loc.coordinates[0])
				});

				locationMarker.open($scope.locationMap);
			};
		}

    	$scope.postComment = function() {
    		var comment = {
    			eventId: $scope.event._id,
    			body: $scope.commentBody,
    			creator: $rootScope.user._id
    		};

    		eventService.postComment($scope.event._id, comment).then(function (data) {
    			$scope.commentBody = null;
	            $scope.event.comments.push(data);
	        },
	        function (errorMessage) {
	            $scope.commentError = errorMessage;
	        });
    	};

    	$scope.postSubComment = function(comment) {
    		var commentToPost = {
    			eventId: $scope.event._id,
    			body: comment.newSubComment,
    			creator: $rootScope.user._id
    		};

    		eventService.postSubComment($scope.event._id, comment._id, commentToPost).then(function (data) {
    			for(var i = 0; i < $scope.event.comments.length; i++) {
    				if($scope.event.comments[i]._id === comment._id) {
    					$scope.event.comments[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.deleteComment = function(comment) {
    		if($rootScope.user._id === comment.creator._id) {
    			eventService.deleteComment($scope.event._id, comment._id).then(function (data) {
    				var index;
		            for(var i = 0; i < $scope.event.comments.length; i++) {
		            	if($scope.event.comments[i]._id === comment._id) {
		            		index = i;
		            		break;
		            	}
		            }
		            if(index > -1) {
		            	$scope.event.comments.splice(index, 1);
		            }
		        },
		        function (errorMessage) {
		        });
    		}
    	};

    	$scope.deleteSubComment = function(commentId, subComment) {
    		if($rootScope.user._id === subComment.creator._id) {
    			eventService.deleteSubComment($scope.event._id, commentId, subComment._id).then(function (data) {
    				for(var i = 0; i < $scope.event.comments.length; i++) {
	    				if($scope.event.comments[i]._id === commentId) {
	    					$scope.event.comments[i] = data;
	    				}
	    			}
		        },
		        function (errorMessage) {
		        });
    		}
    	};

    	$scope.likeComment = function(comment) {
    		eventService.likeComment(comment._id, $rootScope.user._id).then(function (data) {
    			for(var i = 0; i < $scope.event.comments.length; i++) {
    				if($scope.event.comments[i]._id === comment._id) {
    					$scope.event.comments[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.unlikeComment = function(comment) {
    		eventService.unlikeComment(comment._id, $rootScope.user._id).then(function (data) {
    			for(var i = 0; i < $scope.event.comments.length; i++) {
    				if($scope.event.comments[i]._id === comment._id) {
    					$scope.event.comments[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.likesComment = function(comment) {
    		for(var i = 0; i < comment.likes.length; i++) {
    			if(comment.likes[i].toString() === $rootScope.user._id.toString()) {
    				return true;
    			}
    		}
    		return false;
    	};

    	$scope.rsvpToEvent = function() {
    		eventService.rsvp($scope.event._id, $rootScope.user._id).then(function (data) {
    			$scope.event = data;

    			// automatically post to Facebook if user is linked and has option enabled
    			if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && $scope.event.privacy === 'public') {
                    $FB.api(
						'/me/campuslively:post',
						'rsvp_to',
						{ event: $scope.event.facebookId },
						function(response) {
							if (!response || response.error) {
								//console.log(response.error);
							} 
							else {
								//alert('Publish was successful! Action ID: ' + response.id);
							}
						}
					);
                }
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.unRsvpToEvent = function() {
    		eventService.unRsvp($scope.event._id, $rootScope.user._id).then(function (data) {
    			$scope.event = data;
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.isAttending = function() {
    		for(var i = 0; i < $scope.event.attending.length; i++) {
    			if($scope.event.attending[i]) {
	    			if($scope.event.attending[i]._id === $rootScope.user._id) {
	    				return true;
	    			}
	    		}
    		}
    		return false;
    	};

		$scope.open = function (modal) {
		  	if (modal.toLowerCase() === 'share') {
				var modalInstance = $modal.open({
			      templateUrl: 'shareModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			      	event: function() {
	                    return $scope.event;
	                },
	                location: null,
			      	items: null
			      }
			    });
			}
			else if (modal.toLowerCase() === 'invite') {
				var modalInstance = $modal.open({
			      templateUrl: 'inviteModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			      	event: function() {
	                    return $scope.event;
	                },
			      	items: function() {
			      		return userService.getUsersForInvite($rootScope.user._id, $scope.event._id).then(function (data, status) {
	                        return data;
	                    },
	                    function (errorMessage, status) {
	                    }); 
			      	},
			      	location: null
			      }
			    });
			}
			else if (modal.toLowerCase() === 'edit') {
				var modalInstance = $modal.open({
			      templateUrl: 'editModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			      	event: function() {
	                    return $scope.event;
	                },
			      	items: null,
			      	location: null
			      }
			    });
			}
			else if (modal.toLowerCase() === 'delete') {
				var modalInstance = $modal.open({
			      templateUrl: 'deleteModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			      	event: function() {
	                    return $scope.event;
	                },
			      	items: null,
			      	location: null
			      }
			    });
			}
		};
    }]);
});