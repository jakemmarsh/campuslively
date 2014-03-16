define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', ['$scope', '$rootScope', '$modal', 'resolvedUser', 'userService', 'eventService', 'localStorageService', '$FB', 'googleService', function ($scope, $rootScope, $modal, resolvedUser, userService, eventService, localStorageService, $FB, googleService) {
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
            var updateEvent = function(eventId, updatedEvent) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id === eventId) {
                        $scope.events[i] = updatedEvent;
                        break;
                    }
                }
            };

            eventService.rsvp(event._id, $rootScope.user._id).then(function (data) {
                // automatically post to Facebook if user is linked and has option enabled
                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && event.facebookId && event.privacy === 'public') {
                    $FB.login(function (res) {
                        if (res.authResponse) {
                            $rootScope.updateFbStatus($rootScope.updateApiMe);
                            $rootScope.updateApiMe();
                            $FB.api(
                                '/me/campuslively:rsvp_to',
                                'post',
                                { event: event.facebookId },
                                function(response) {
                                    console.log(response);
                                }
                            );
                        }
                    });
                }

                // create Google Calendar event if user is linked
                if($rootScope.user.google.id && $rootScope.user.google.calendarId) {
                    googleService.addEvent($rootScope.user.google.calendarId, event).then(function (data) {
                        // update event with user's Google Calendar event ID
                        eventService.addGoogleEventId(event._id, $rootScope.user.username, data.id).then(function(updatedEvent) {
                            updateEvent(event._id, updatedEvent);
                        });
                    });
                }
                else {
                    updateEvent(event._id, data);
                }
            });
        };

        $scope.unRsvpToEvent = function(event) {
            var updateEvent = function(eventId, updatedEvent) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if($scope.events[i]._id === eventId) {
                        $scope.events[i] = updatedEvent;
                        break;
                    }
                }
            };

            eventService.unRsvp(event._id, $rootScope.user._id).then(function (data) {
                // remove from user's Google Calendar if linked
                if($rootScope.user.google.id && $rootScope.user.google.calendarId && event.googleCalendarIds) {
                    var removeFromEvent = function() {
                        // remove user's Google Calendar event ID from event
                        eventService.removeGoogleEventId(event._id, $rootScope.user.username).then(function(updatedEvent) {
                            updateEvent(event._id, updatedEvent);
                        });
                    };
                    googleService.removeEvent($rootScope.user.google.calendarId, event.googleCalendarIds[$rootScope.user.username]).then(function () {
                        removeFromEvent();
                    }, function() {
                        removeFromEvent();
                    });
                }
                else {
                    updateEvent(event._id, data);
                }
            });
        };

        $scope.isAttending = function(event) {
            if(event.attending) {
                for(var i = 0; i < event.attending.length; i++) {
                    if(event.attending[i]._id === $rootScope.user._id) {
                        return true;
                    }
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
            $modal.open({
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
            $modal.open({
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
            $modal.open({
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
            $modal.open({
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