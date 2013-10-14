define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $rootScope, $stateParams, $modal, eventService, resolvedEvent) {
    	$scope.event = resolvedEvent;

    	console.log($scope.event);

    	$scope.toggleAttending = function() {
    		$scope.attending = !$scope.attending;
    	};

    	$scope.postComment = function() {
    		var comment = {
    			eventId: $scope.event._id,
    			body: $scope.commentBody,
    			creator: $rootScope.user._id
    		};

    		eventService.postComment($scope.event._id, comment).then(function (data) {
    			$scope.commentBody = null;
	            $scope.event = data;
	        },
	        function (errorMessage) {
	            $scope.commentError = errorMessage;
	        });
    	};

    	$scope.deleteComment = function(comment) {
    		if($rootScope.user._id == comment.creator._id) {
    			eventService.deleteComment(comment._id).then(function (data) {
		            $scope.event = data;
		        },
		        function (errorMessage) {
		            console.log(errorMessage);
		        });
    		}
    	};

    	$scope.postSubComment = function(comment) {
    		var commentToPost = {
    			eventId: $scope.event._id,
    			body: comment.newSubComment,
    			creator: $rootScope.user._id
    		};

    		eventService.postSubComment($scope.event._id, comment._id, commentToPost).then(function (data) {
	            $scope.event = data;
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
    	};

    	$scope.likeComment = function(comment) {
    		eventService.likeComment(comment._id, $rootScope.user._id).then(function (data) {
    			for(var i = 0; i < $scope.event.comments.length; i++) {
    				if($scope.event.comments[i]._id == comment._id) {
    					$scope.event.comments[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
    	};

    	$scope.unlikeComment = function(comment) {
    		eventService.unlikeComment(comment._id, $rootScope.user._id).then(function (data) {
    			for(var i = 0; i < $scope.event.comments.length; i++) {
    				if($scope.event.comments[i]._id == comment._id) {
    					$scope.event.comments[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
    	};

    	$scope.likesComment = function(comment) {
    		for(var i = 0; i < comment.likes.length; i++) {
    			if(comment.likes[i].toString() == $rootScope.user._id.toString()) {
    				return true;
    			}
    		}
    		return false;
    	};

    	$scope.mapOptions = {
			center: new google.maps.LatLng(44.883125, -68.671977),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			draggable: false,
			scrollwheel: false,
			panControl: false
	    };

		$scope.open = function (modal) {
		  	if (modal.toLowerCase() == 'share') {
				var modalInstance = $modal.open({
			      templateUrl: 'shareModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
			else if (modal.toLowerCase() == 'invite') {
				var modalInstance = $modal.open({
			      templateUrl: 'inviteModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
		};
    });
});