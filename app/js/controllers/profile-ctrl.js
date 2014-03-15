define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', ['$scope', '$rootScope', '$modal', 'resolvedUser', 'userService', 'eventService', 'localStorageService', '$FB', function ($scope, $rootScope, $modal, resolvedUser, userService, eventService, localStorageService, $FB) {
        var oldestId,
            updateSubscribers = function() {
                userService.getSubscribers($scope.profile._id).then(function (data) {
                    $scope.subscribers = data;
                });
            };

        $scope.profile = resolvedUser;
    	$scope.loading = true;

        eventService.getEventsByUser($scope.profile._id, 20).then(function (data) {
            $scope.events = data;
            $scope.loading = false;
            if(data.length === 20) {
                $scope.moreToLoad = true;
            }
            else {
                $scope.moreToLoad = false;
            }
            if(data.length > 0) {
                oldestId = data[data.length-1]._id;
            }
        }, function(errorMessage) {
            $scope.loading = false;
            $scope.loadEventsError = errorMessage;
        });

        updateSubscribers();
    	
    	$scope.sortOptions = [{
                label: 'by start date',
                value: 'startDate'
            },
            {
                label: 'by post date',
                value: '-timestamp'
            }
        ];

        $scope.changeSort = function(option) {
            $scope.currentSort = option;
        };

        $scope.currentSort = {
            label: 'by start date',
            value: 'startDate'
        };

        $scope.isSubscribed = function() {
            for(var i = 0; i < $rootScope.user.subscriptions.length; i++) {
                if($rootScope.user.subscriptions[i]._id === $scope.profile._id) {
                    return true;
                }
            }

            return false;
        };

        $scope.toggleSubscribe = function() {
            if($scope.isSubscribed()) {
                userService.unsubscribe($rootScope.user._id, $scope.profile._id).then(function (data) {
                    $rootScope.user = data;
                    localStorageService.add('user', data);

                    updateSubscribers();
                },
                function() {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            else {
                userService.subscribe($rootScope.user._id, $scope.profile._id).then(function (data) {
                    $rootScope.user = data;
                    localStorageService.add('user', data);

                    updateSubscribers();
                },
                function() {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            $scope.isSubscribed();
        };

        $scope.rsvpToEvent = function(event) {
            eventService.rsvp(event._id, $rootScope.user._id).then(function (data) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id === event._id) {
                        $scope.events[i] = data;
                        break;
                    }
                }

                // automatically post to Facebook if user is linked and has option enabled
                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && event.facebookId && event.privacy === 'public') {
                    $FB.api(
                        '/me/campuslively:rsvp_to',
                        'post',
                        { event: event.facebookId },
                        function(response) {
                        }
                    );
                }
            },
            function (errorMessage) {
            });
        };

        $scope.unRsvpToEvent = function(event) {
            eventService.unRsvp(event._id, $rootScope.user._id).then(function (data) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id === event._id) {
                        $scope.events[i] = data;
                        break;
                    }
                }
            },
            function (errorMessage) {
            });
        };

        $scope.isAttending = function(event) {
            for(var i = 0; i < event.attending.length; i++) {
                if(event.attending[i]._id === $rootScope.user._id) {
                    return true;
                }
            }
            return false;
        };

        $scope.loadMore = function() {
            $scope.loadingMore = true;
            eventService.getEventsByUserOlder($scope.profile._id, oldestId, 20).then(function (data) {
                if(data.length < 20) {
                    $scope.moreToLoad = false;
                }
                if(data.length > 0) {
                    for(var i = 0; i < data.length; i++) {
                        $scope.events.push(data[i]);
                    }
                    oldestId = data[data.length-1]._id;
                }
                $scope.loadingMore = false;
            }, function() {
                $scope.loadingMore = false;
            });
        };

        $scope.openAttending = function(event) {
            var modalInstance = $modal.open({
              templateUrl: 'attendingModal.html',
              controller: 'peopleListModalCtrl',
              resolve: {
                items: function() {
                    return event.attending;
                }
              }
            });
        };

        $scope.openSubscribers = function() {
            var modalInstance = $modal.open({
              templateUrl: 'subscribersModal.html',
              controller: 'peopleListModalCtrl',
              resolve: {
                items: function() {
                    return $scope.subscribers;
                }
              }
            });
        };

        $scope.openShare = function(event) {
            var modalInstance = $modal.open({
              templateUrl: 'shareModal.html',
              controller: 'shareEventModalCtrl',
              resolve: {
                event: function() {
                        return event;
                    }
              }
            });
        };

        $scope.openLocation = function(profile) {
            var modalInstance = $modal.open({
              templateUrl: 'locationModal.html',
              controller: 'basicModalCtrl',
              resolve: {
                location: function() {
                    var newLoc = profile.loc;
                    newLoc.address = profile.address;
                    return newLoc;
                },
                items: null,
                event: null
              }
            });
        };
    }]);
});