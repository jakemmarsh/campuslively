define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $rootScope, $stateParams, $modal, resolvedUser, userService, eventService) {
        $scope.profile = resolvedUser;
    	$scope.loading = true;

        eventService.getEventsByUser($scope.profile._id).then(function (data, status) {
            $scope.events = data;
            $scope.loading = false;
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

        $scope.openLocation = function () {
            var modalInstance = $modal.open({
              templateUrl: 'locationModal.html',
              controller: 'modalInstanceCtrl'
            });
        };
    });
});