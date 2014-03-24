define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', ['$scope', '$rootScope', '$modal', 'locationService', 'eventService', '$timeout', '$FB', 'googleService', function ($scope, $rootScope, $modal, locationService, eventService, $timeout, $FB, googleService) {
        var oldestId, newestId,
        getSchoolEvents = function() {
            eventService.getEventsBySchool($rootScope.user.school._id, 20).then(function (data) {
                $scope.events = data;
                $scope.loading = false;
                if(data.length === 20) {
                    $scope.moreToLoadSchool = true;
                }
                else {
                    $scope.moreToLoadSchool = false;
                }
                if(data.length > 0) {
                    oldestId = data[data.length-1]._id;
                    newestId = data[0]._id;
                }
                $scope.checkForEvents();
            }, function(errorMessage) {
                $scope.loading = false;
                $scope.loadError = errorMessage;
            });
        },
        getNearbyEvents = function() {
            eventService.getEventsByLocation($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), 20).then(function (data) {
                $scope.events = data;
                $scope.loading = false;
                if(data.length === 20) {
                    $scope.moreToLoadNearby = true;
                }
                else {
                    $scope.moreToLoadNearby = false;
                }
                if(data.length > 0) {
                    oldestId = data[data.length-1]._id;
                    newestId = data[0]._id;
                }
                $scope.checkForEvents();
            }, function(errorMessage) {
                $scope.loading = false;
                $scope.loadError = errorMessage;
            });
        };

        $scope.currentView = 'school';

        $scope.viewOptions = [
            {
                label: 'My School',
                value: 'school'
            },
            {
                label: 'Nearby',
                value: 'nearby'
            }
        ];

        $scope.$watch('currentView', function() {
            $scope.loading = true;
            $scope.events = [];
            if($scope.currentView === 'school') {
                getSchoolEvents();
            }
            else if($scope.currentView === 'nearby') {
                // get user's location before events if not already known
                if(!$rootScope.userPosition) {
                    $scope.gettingPosition = true;
                    locationService.getGeo().then(function (data) {
                        $rootScope.userPosition = data;
                        $scope.gettingPosition = false;
                        $scope.loading = true;

                        getNearbyEvents();
                    },
                    function (errorMessage) {
                    });
                }
                else {
                    getNearbyEvents();
                }
            }
        });

        $scope.newEvents = [];

        // get events with newer _id
        $scope.loadNew = function() {
            if($scope.currentView === 'school') {
                eventService.getEventsBySchoolNewer($rootScope.user.school._id, newestId).then(function (data) {
                    if(data.length > 0) {
                        $scope.newEvents = data;
                    }
                },
                function (errorMessage) {
                });
            }
            else if($scope.currentView === 'nearby') {
                eventService.getEventsByLocationNewer($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), newestId).then(function (data) {
                    if(data.length > 0) {
                        $scope.newEvents = data;
                    }
                },
                function (errorMessage) {
                });
            }
        };

        // refresh feed every 30 seconds
        var exploreTimeout;
        $scope.checkForEvents = function() {
            exploreTimeout = $timeout(function() {
                    $scope.loadNew();
                    $scope.checkForEvents();
            }, 30000);
        };

        // add newly retrieved events to view
        $scope.addNew = function() {
            if($scope.newEvents.length > 0) {
                for(var i = 0; i < $scope.newEvents.length; i++) {
                    $scope.events.unshift($scope.newEvents[i]);
                }
                newestId = $scope.newEvents[0]._id;
                $scope.newEvents = [];
            }
        };

        // stop refreshing list upon page leave
        $scope.$on('$destroy', function(){
            $timeout.cancel(exploreTimeout);
        });

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
                                    //console.log(response);
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
                return false;
            }
        };

        $scope.loadMore = function() {
            $scope.loadingMore = true;
            if($scope.currentView === 'school') {
                eventService.getEventsBySchoolOlder($rootScope.user.school._id, oldestId, 20).then(function (data) {
                    if(data.length < 20) {
                        $scope.moreToLoadSchool = false;
                    }
                    if(data.length > 0) {
                        for(var i = 0; i < data.length; i++) {
                            $scope.events.push(data[i]);
                        }
                        oldestId = data[data.length-1]._id;
                    }
                    $scope.loadingMore = false;
                }, function(errorMessage) {
                    $scope.loadingMore = false;
                });
            }
            else if($scope.currentView === 'nearby') {
                eventService.getEventsByLocationOlder($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), oldestId, 20).then(function (data) {
                    if(data.length < 20) {
                        $scope.moreToLoadNearby = false;
                    }
                    if(data.length > 0) {
                        for(var i = 0; i < data.length; i++) {
                            $scope.events.push(data[i]);
                        }
                        oldestId = data[data.length-1]._id;
                    }
                    $scope.loadingMore = false;
                }, function(errorMessage) {
                    $scope.loadingMore = false;
                });
            }
        };

        $scope.openAttending = function (event) {
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

    }]);
});