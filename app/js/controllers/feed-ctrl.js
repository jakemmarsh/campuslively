define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', function ($scope, $rootScope, $modal, userService, eventService) {
    	$scope.loading = true;

        userService.getActivities($rootScope.user._id).then(function (data) {
            $scope.activities = data;
            console.log(data);
            $scope.loading = false;
        },
        function (errorMessage) {
            console.log(errorMessage);
        })

        $scope.loadMore = function() {
            console.log('load more feed items');
        };

    	$scope.rsvpToEvent = function(eventId) {
            eventService.rsvp(eventId, $rootScope.user._id).then(function (data) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id == eventId) {
                        $scope.events[i] = data;
                    }
                }
            },
            function (errorMessage) {
                console.log(errorMessage);
            });
        };

        $scope.unRsvpToEvent = function(eventId) {
            eventService.unRsvp(eventId, $rootScope.user._id).then(function (data) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id == eventId) {
                        $scope.events[i] = data;
                    }
                }
            },
            function (errorMessage) {
                console.log(errorMessage);
            });
        };

        $scope.isAttending = function(event) {
            for(var i = 0; i < event.attending.length; i++) {
                if(event.attending[i]._id == $rootScope.user._id) {
                    return true;
                }
            }
            return false;
        };

		$scope.openAttending = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};
    });
});