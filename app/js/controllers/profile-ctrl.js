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

        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            slides.push({
                image: 'http://placekitten.com/958/200'
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
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

        $scope.toggleSubscribe = function() {
            $scope.subscribed = !$scope.subscribed;
        }

        $scope.toggleAttending = function(eventId) {
            $scope.attending = !$scope.attending;
        };

        $scope.openAttending = function (eventId) {
            var modalInstance = $modal.open({
              templateUrl: 'attendingModal.html',
              controller: 'modalInstanceCtrl'
            });
        };

        $scope.openLocation = function () {
            var modalInstance = $modal.open({
              templateUrl: 'locationModal.html',
              controller: 'modalInstanceCtrl'
            });
        };
    });
});