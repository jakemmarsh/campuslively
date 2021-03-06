define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('feedCtrl', ['$scope', '$rootScope', '$modal', 'userService', 'eventService', '$timeout', '$FB', 'googleService', function ($scope, $rootScope, $modal, userService, eventService, $timeout, $FB, googleService) {
        var oldestId, newestId;
        $scope.currentView = 'events';
        $scope.eventActivities = [];
        $scope.actionActivities = [];

        $scope.viewOptions = [
            {
                label: 'Events',
                value: 'events'
            },
            {
                label: 'Actions',
                value: 'actions'
            }
        ];

        $scope.loading = true;

        userService.getActivities($rootScope.user._id, 20).then(function (data) {
            // separate activities into "event activites" and "action activities" for proper filtering
            for(var i = 0; i < data.length; i++) {
                if(data[i].activity === 'subscribed' ||
                    data[i].activity === 'rsvpd' ||
                    data[i].activity === 'commented' ||
                    data[i].activity === 'invited') {
                    $scope.actionActivities.push(data[i]);
                }
                else if (data[i].activity === 'posted') {
                    $scope.eventActivities.push(data[i]);
                }
            }
            $scope.loading = false;
            if(data.length === 20) {
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
            $scope.loading = false;
        });

        $scope.loadNew = function() {
            userService.getActivitiesNewer($rootScope.user._id, newestId).then(function (data) {
                if(data.length > 0) {
                    // separate activities into "event activites" and "action activities" for proper filtering
                    for(var i = 0; i < data.length; i++) {
                        if(data[i].activity === 'subscribed' ||
                           data[i].activity === 'rsvpd' ||
                           data[i].activity === 'commented' ||
                           data[i].activity === 'invited') {
                            $scope.actionActivities.unshift(data[i]);
                        }
                        else if(data[i].activity === 'posted') {
                            $scope.eventActivities.unshift(data[i]);
                        }
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
                        $scope.activities.push(data[i]);
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
            if(event && $rootScope.user) {
                if(event.attending) {
                    for(var i = 0; i < event.attending.length; i++) {
                        if(event.attending[i]._id === $rootScope.user._id || event.attending[i] === $rootScope.user._id) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        $scope.rsvpToEvent = function(activity) {
            eventService.rsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                // automatically post to Facebook if user is linked and has option enabled
                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && activity.event.facebookId && activity.event.privacy === 'public') {
                    $FB.login(function (res) {
                        if (res.authResponse) {
                            $rootScope.updateFbStatus($rootScope.updateApiMe);
                            $rootScope.updateApiMe();
                            $FB.api(
                                '/me/campuslively:rsvp_to',
                                'post',
                                { event: activity.event.facebookId },
                                function(response) {
                                    //console.log(response);
                                }
                            );
                        }
                    });
                }

                // create Google Calendar event if user is linked
                if($rootScope.user.google.id && $rootScope.user.google.calendarId) {
                    googleService.addEvent($rootScope.user.google.calendarId, activity.event).then(function (data) {
                        // update event with user's Google Calendar event ID
                        eventService.addGoogleEventId(activity.event._id, $rootScope.user.username, data.id).then(function(updatedEvent) {
                            activity.event = updatedEvent;
                        });
                    });
                }
                else {
                    activity.event = data;
                }
            });
        };

        $scope.unRsvpToEvent = function(activity) {
            eventService.unRsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                // remove from user's Google Calendar if linked
                if($rootScope.user.google.id && $rootScope.user.google.calendarId && activity.event.googleCalendarIds) {
                    var removeFromEvent = function() {
                        // remove user's Google Calendar event ID from event
                        eventService.removeGoogleEventId(activity.event._id, $rootScope.user.username).then(function(updatedEvent) {
                            activity.event = updatedEvent;
                        });
                    };
                    googleService.removeEvent($rootScope.user.google.calendarId, activity.event.googleCalendarIds[$rootScope.user.username]).then(function () {
                        removeFromEvent();
                    }, function() {
                        removeFromEvent();
                    });
                }
                else {
                    activity.event = data;
                }
            });
        };

        $scope.unRsvpToEvent = function(activity) {
            eventService.unRsvp(activity.event._id, $rootScope.user._id).then(function (data) {
                activity.event = data;
            });
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