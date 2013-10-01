define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', function ($scope, $modal) {
    	$scope.event = {
    		title: 'DJ Hardo',
    		location: 'Bijou Nightclub',
    		day: 'June 10th',
    		time: '11:30pm',
    		description: 'Famous Miami-based DJ Hardo LIVE at Bijou tonight! Tickets are $20 at the door. Order now and get them for $15! www.bijounightclub.com'
    	};

    	$scope.toggleAttending = function(eventId) {
			$scope.attending = !$scope.attending;
		}

		$scope.openAttending = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};
    });
});