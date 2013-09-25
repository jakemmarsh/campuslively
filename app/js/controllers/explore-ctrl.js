define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $modal) {
    	$scope.currentView = 'school';
    	
    	$scope.viewOptions = [{
				label : 'My School',
				value : 'school'
			},
			{
				label : 'Nearby',
				value : 'nearby'
			}
		];

		$scope.openRSVP = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'rsvpModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};

		$scope.openAttending = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};
    	
    });
});