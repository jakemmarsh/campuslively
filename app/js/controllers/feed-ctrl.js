define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', function ($scope, $modal) {
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