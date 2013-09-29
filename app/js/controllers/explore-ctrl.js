define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $modal, resolvedLocation) {
    	$scope.userPosition = resolvedLocation;
    	$scope.currentView = 'school';
    	
    	$scope.viewOptions = [{
				label: 'My School',
				value: 'school'
			},
			{
				label: 'Nearby',
				value: 'nearby'
			}
		];

		$scope.currentSort = {
			label: 'by start date',
			value: 'startDate'
		};

		$scope.sortOptions = [{
				label: 'by start date',
				value: 'startDate'
			},
			{
				label: 'by post date',
				value: 'postDate'
			}
		];

		$scope.changeSort = function(option) {
			$scope.currentSort = option;
		}

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