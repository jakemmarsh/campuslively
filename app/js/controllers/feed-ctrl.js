define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', ['$scope', '$rootScope', '$modal', 'userService', 'eventService', '$timeout', '$FB', function ($scope, $rootScope, $modal, userService, eventService, $timeout, $FB) {
        var oldestId, newestId;
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
            if(data.length > 0) {
                oldestId = data[data.length-1]._id;
                newestId = data[0]._id;
            }
            $scope.checkForActivities();
        },
        function (errorMessage) {
        });

        $scope.loadNew = function() {
            userService.getActivitiesNewer($rootScope.user._id, newestId).then(function (data) {
                if(data.length > 0) {
                    for(var i = 0; i < data.length; i++) {
                        $scope.activities.unshift(data[i]);
                    }
                    newestId = data[0]._id;
                }
            },
            function (errorMessage) {
            });
        };

        // refresh feed every 30 seconds
        var feedTimeout;
        $scope.checkForActivities = function() {
            feedTimeout = $timeout(function() {
                    $scope.loadNew();
                    $scope.checkForActivities();
            }, 30000);
        };

        // stop refreshing feed upon leaving page
        $scope.$on('$destroy', function(){
            $timeout.cancel(feedTimeout);
        });

        $scope.loadMore = function() {
            $scope.loadingMore = true;
            userService.getActivitiesOlder($rootScope.user._id, oldestId, 20).then(function (data) {
                if(data.length < 20) {
                    $scope.moreToLoad = false;
                }
                if(data.length > 0) {
                    for(var i = 0; i < data.length; i++) {
                        $scope.activities.push(data);
                    }
                    oldestId = data[data.length-1]._id;
                }
                $scope.loadingMore = false;
            },
            function (errorMessage) {
                $scope.loadingMore = false;
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

    	$scope.rsvpToEvent = function(activity) {
            eventService.rsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                activity.event = data;

                // automatically post to Facebook if user is linked and has option enabled
                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost) {
                    // make call to facebook API to autopost RSVP event
                }

                // automatically post to Facebook if user is linked and has option enabled
                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && activity.event.facebookId) {
                    $FB.api(
                        '/me/campuslively:rsvp_to',
                        'post',
                        { event: activity.event.facebookId },
                        function(response) {
                        }
                    );
                }
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

		$scope.openAttending = function (event) {
            var modalInstance = $modal.open({
              templateUrl: 'attendingModal.html',
              controller: 'modalInstanceCtrl',
              resolve: {
                items: function() {
                    return event.attending;
                },
                location: null,
                event: null
              }
            });
        };
    }]);
});