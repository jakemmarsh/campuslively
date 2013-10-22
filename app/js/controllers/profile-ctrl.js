define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $rootScope, $stateParams, $modal, resolvedUser, userService, eventService) {
        $scope.profile = resolvedUser;
    	$scope.loading = true;

        eventService.getEventsByUser($scope.profile._id, 20).then(function (data, status) {
            $scope.events = data;
            $scope.loading = false;
            if(data.length == 20) {
                $scope.moreToLoad = true;
            }
            else {
                $scope.moreToLoad = false;
            }
        }, function(err, status) {
            console.log(err.message);
            $scope.loading = false;
        });
    	
    	$scope.sortOptions = [{
                label: 'by start date',
                value: 'startDate'
            },
            {
                label: 'by post date',
                value: '-created'
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
                if($rootScope.user.subscriptions[i]._id == $scope.profile._id) {
                    return true;
                }
            }

            return false;
        };

        $scope.toggleSubscribe = function() {
            if($scope.isSubscribed()) {
                userService.unsubscribe($rootScope.user._id, $scope.profile._id).then(function (data, status) {
                    $rootScope.user = data;
                },
                function (errorMessage, status) {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            else {
                userService.subscribe($rootScope.user._id, $scope.profile._id).then(function (data, status) {
                    $rootScope.user = data;
                },
                function (errorMessage, status) {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            $scope.isSubscribed();
        };

        $scope.rsvpToEvent = function(eventId) {
            eventService.rsvp(eventId, $rootScope.user._id).then(function (data) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id == eventId) {
                        $scope.events[i] = data;
                        break;
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
                        break;
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

        $scope.loadMore = function() {
            $scope.loadingMore = true;
            eventService.getEventsByUserOlder($scope.profile._id, $scope.events.length, 20).then(function (data, status) {
                if(data.length == 0) {
                    $scope.moreToLoad = false;
                }
                else {
                    for(var i = 0; i < data.length; i++) {
                        $scope.events.push(data);
                    }
                }
                $scope.loadingMore = false;
            }, function(err, status) {
                $scope.loadingMore = false;
            });
        };

        $scope.openAttending = function (event) {
            var modalInstance = $modal.open({
              templateUrl: 'attendingModal.html',
              controller: 'modalInstanceCtrl',
              resolve: {
                items: function() {
                    return event.attending;
                }
              }
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