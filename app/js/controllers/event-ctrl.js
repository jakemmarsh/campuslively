define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $stateParams, $modal) {
    	$scope.eventId = $stateParams.eventId;

    	$scope.postComment = function() {
    		console.log('post comment');
    	}

    	$scope.postSubComment = function() {
    		console.log('post SUBcomment');
    	}

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
		  	if (modal.toLowerCase() == 'rsvp') {
			    var modalInstance = $modal.open({
			      templateUrl: 'rsvpModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			}
			else if (modal.toLowerCase() == 'share') {
				var modalInstance = $modal.open({
			      templateUrl: 'shareModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			}
		};
    });
});