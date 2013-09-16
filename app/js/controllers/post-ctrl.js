define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', function ($scope) {
    	$scope.eventPosted = false;

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

	    $scope.postEvent = function() {
	    	$scope.eventPosted = true;
	    	console.log('post');
	    }
    });
});