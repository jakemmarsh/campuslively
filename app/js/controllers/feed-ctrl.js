define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', function ($scope, $rootScope, $modal, userService, eventService) {
    	$scope.loading = true;

        userService.getActivities($rootScope.user._id, 20).then(function (data) {
            $scope.activities = data;
            $scope.loading = false;
            if(data.length == 20) {
                $scope.moreToLoad = true;
            }
            else {
                $scope.moreToLoad = false;
            }
        },
        function (errorMessage) {
            console.log(errorMessage);
        });

        $scope.loadMore = function() {
            $scope.loadingMore = true;
            userService.getActivities($rootScope.user._id, $scope.activities.length, 20).then(function (data) {
                if(data.length == 0) {
                    $scope.moreToLoad = false;
                }
                else {
                    for(var i = 0; i < data.length; i++) {
                        $scope.activities.push(data);
                    }
                }
                $scope.loadingMore = false;
            },
            function (errorMessage) {
                $scope.loadingMore = false;
            });
        };

    	$scope.rsvpToEvent = function(activityIndex, eventId) {
            console.log(activityIndex);
            eventService.rsvp(eventId, $rootScope.user._id).then(function (data) {
                $scope.activities[activityIndex].event = data;
            },
            function (errorMessage) {
            });
        };

        $scope.unRsvpToEvent = function(activityIndex, eventId) {
            eventService.unRsvp(eventId, $rootScope.user._id).then(function (data) {
                $scope.activities[activityIndex].event = data;
            },
            function (errorMessage) {
            });
        };

        $scope.isAttending = function(event) {
            if(event) {
                if(event.attending) {
                    for(var i = 0; i < event.attending.length; i++) {
                        if(event.attending[i]._id == $rootScope.user._id || event.attending[i] == $rootScope.user._id) {
                            return true;
                        }
                    }
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
    	$scope.rsvpToEvent = function(activity) {
            eventService.rsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                activity.event = data;
            },
            function (errorMessage) {
            });
        };

        $scope.unRsvpToEvent = function(activity) {
            eventService.unRsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                activity.event = data;
            },
            function (errorMessage) {
            });
        };

    });
});