define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', function ($scope, locationService, resolvedLocation) {
    	$scope.userPosition = resolvedLocation;

    	var testFour = function(position) {
    		locationService.foursquare(position).then(function (data) {
				console.log(data);
		    },
		    function (errorMessage) {
		        console.log(errorMessage);
		    });
    	}

    	testFour($scope.userPosition);

    	$scope.eventPosted = false;

    	$scope.mapOptions = {
			center: new google.maps.LatLng($scope.userPosition.latitude, $scope.userPosition.longitude),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			draggable: false,
			scrollwheel: false,
			panControl: false
	    };

	    $scope.postEvent = function() {
	    	$scope.eventPosted = true;
	    	console.log('post');
	    }
    });
});