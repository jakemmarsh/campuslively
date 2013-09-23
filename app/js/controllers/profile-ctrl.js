define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams, $modal) {
    	$scope.currentView = 'upcoming';
    	
    	if($stateParams.userName == 'jakemmarsh') {
    		$scope.userName = "Jake Marsh";
    	}
    	else {
    		$scope.userName = $stateParams.userName;
    	}

    	$scope.viewOptions = [{
				label : 'Upcoming',
				value : 'upcoming'
			},
			{
				label : 'Newest',
				value : 'newest'
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