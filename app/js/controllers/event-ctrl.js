define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', ['$scope', '$rootScope', '$modal', 'eventService', 'userService', 'resolvedEvent', '$location', 'googleService', '$FB',  function ($scope, $rootScope, $modal, eventService, userService, resolvedEvent, $location, googleService, $FB) {
        $scope.event = resolvedEvent;

        $scope.eventPassed = $rootScope.eventPassed($scope.event.startDate);

        // check to see if event has a legitimate location
        $scope.hasLocation = ($scope.event.loc && ($scope.event.loc.coordinates[0] !== -180 || $scope.event.loc.coordinates[1] !== -90));

        if($scope.hasLocation) {
            $scope.mapOptions = {
                center: new google.maps.LatLng($scope.event.loc.coordinates[1], $scope.event.loc.coordinates[0]),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                scrollwheel: false,
                panControl: false
            };

            $scope.placeMarker = function() {
                var contentString = '<h3 class="flush">'+$scope.event.locationName+'</h3>'+
                                    '<a href="https://maps.google.com/maps?daddr='+$scope.event.loc.coordinates[1]+','+$scope.event.loc.coordinates[0]+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
                                    'target="_blank" class="block">Get Directions</a>',

                locationMarker = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300,
                    position: new google.maps.LatLng($scope.event.loc.coordinates[1], $scope.event.loc.coordinates[0])
                });

                locationMarker.open($scope.locationMap);
            };
        }

        $scope.postComment = function() {
            var comment = {
                eventId: $scope.event._id,
                body: $scope.commentBody,
                creator: $rootScope.user._id
            };

            eventService.postComment($scope.event._id, comment).then(function (data) {
                $scope.commentBody = null;
                $scope.event.comments.push(data);
            },
            function (errorMessage) {
                $scope.commentError = errorMessage;
            });
        };

        $scope.postSubComment = function(comment) {
            var commentToPost = {
                eventId: $scope.event._id,
                body: comment.newSubComment,
                creator: $rootScope.user._id
            };

            eventService.postSubComment($scope.event._id, comment._id, commentToPost).then(function (data) {
                for(var i = 0; i < $scope.event.comments.length; i++) {
                    if($scope.event.comments[i]._id === comment._id) {
                        $scope.event.comments[i] = data;
                    }
                }
            },
            function (errorMessage) {
            });
        };

        $scope.deleteComment = function(comment) {
            if($rootScope.user._id === comment.creator._id) {
                eventService.deleteComment($scope.event._id, comment._id).then(function (data) {
                    var index;
                    for(var i = 0; i < $scope.event.comments.length; i++) {
                        if($scope.event.comments[i]._id === comment._id) {
                            index = i;
                            break;
                        }
                    }
                    if(index > -1) {
                        $scope.event.comments.splice(index, 1);
                    }
                },
                function (errorMessage) {
                });
            }
        };

        $scope.deleteSubComment = function(commentId, subComment) {
            if($rootScope.user._id === subComment.creator._id) {
                eventService.deleteSubComment($scope.event._id, commentId, subComment._id).then(function (data) {
                    for(var i = 0; i < $scope.event.comments.length; i++) {
                        if($scope.event.comments[i]._id === commentId) {
                            $scope.event.comments[i] = data;
                        }
                    }
                },
                function (errorMessage) {
                });
            }
        };

        $scope.likeComment = function(comment) {
            eventService.likeComment(comment._id, $rootScope.user._id).then(function (data) {
                for(var i = 0; i < $scope.event.comments.length; i++) {
                    if($scope.event.comments[i]._id === comment._id) {
                        $scope.event.comments[i] = data;
                    }
                }
            },
            function (errorMessage) {
            });
        };

        $scope.unlikeComment = function(comment) {
            eventService.unlikeComment(comment._id, $rootScope.user._id).then(function (data) {
                for(var i = 0; i < $scope.event.comments.length; i++) {
                    if($scope.event.comments[i]._id === comment._id) {
                        $scope.event.comments[i] = data;
                    }
                }
            },
            function (errorMessage) {
            });
        };

        $scope.likesComment = function(comment) {
            for(var i = 0; i < comment.likes.length; i++) {
                if(comment.likes[i].toString() === $rootScope.user._id.toString()) {
                    return true;
                }
            }
            return false;
        };

        $scope.rsvpToEvent = function(event) {
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
                            $scope.event = updatedEvent;
                        });
                    });
                }
                else {
                    $scope.event = data;
                }
            });
        };

        $scope.unRsvpToEvent = function(event) {
            eventService.unRsvp(event._id, $rootScope.user._id).then(function (data) {
                // remove from user's Google Calendar if linked
                if($rootScope.user.google.id && $rootScope.user.google.calendarId && event.googleCalendarIds) {
                    var removeFromEvent = function() {
                        // remove user's Google Calendar event ID from event
                        eventService.removeGoogleEventId(event._id, $rootScope.user.username).then(function(updatedEvent) {
                            $scope.event = updatedEvent;
                        });
                    };
                    googleService.removeEvent($rootScope.user.google.calendarId, event.googleCalendarIds[$rootScope.user.username]).then(function () {
                        removeFromEvent();
                    }, function() {
                        removeFromEvent();
                    });
                }
                else {
                    $scope.event = data;
                }
            });
        };

        $scope.isAttending = function() {
            for(var i = 0; i < $scope.event.attending.length; i++) {
                if($scope.event.attending[i]) {
                    if($scope.event.attending[i]._id === $rootScope.user._id) {
                        return true;
                    }
                }
            }
            return false;
        };

        $scope.open = function (modal) {
            if (modal.toLowerCase() === 'share') {
                $modal.open({
                  templateUrl: 'shareModal.html',
                  controller: 'shareEventModalCtrl',
                  resolve: {
                    event: function() {
                        return $scope.event;
                    }
                  }
                });
            }
            else if (modal.toLowerCase() === 'invite') {
                $modal.open({
                  templateUrl: 'inviteModal.html',
                  controller: 'inviteEventModalCtrl',
                  resolve: {
                    event: function() {
                        return $scope.event;
                    },
                    items: function() {
                        return userService.getUsersForInvite($rootScope.user._id, $scope.event._id).then(function (data) {
                            return data;
                        });
                    }
                  }
                });
            }
            else if (modal.toLowerCase() === 'edit') {
                $modal.open({
                  templateUrl: 'editModal.html',
                  controller: 'editEventModalCtrl',
                  resolve: {
                    event: function() {
                        return $scope.event;
                    }
                  }
                });
            }
            else if (modal.toLowerCase() === 'delete') {
                $modal.open({
                  templateUrl: 'deleteModal.html',
                  controller: 'basicModalCtrl',
                  resolve: {
                    event: function() {
                        return $scope.event;
                    },
                    items: null,
                    location: null
                  }
                });
            }
        };
    }]);
});