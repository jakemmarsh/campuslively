define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('editEventModalCtrl', ['$scope', '$rootScope', '$modalInstance', '$state', '$stateParams', 'event', 'eventService', 'locationService', function ($scope, $rootScope, $modalInstance, $state, $stateParams, event, eventService, locationService) {
        $scope.newImage = {};
        // call to foursquare to get list of venues near user's location
        var getVenues = function(position) {
            locationService.getFoursquareVenues(position).then(function (data) {
                $scope.venues = [];
                if(data.response.groups) {
                    for(var i = 0; i < data.response.groups.length; i++) {
                        $scope.venues = $scope.venues.concat(data.response.groups[i].items);
                    }
                }
                else if(data.response.venues) {
                    $scope.venues = data.response.venues;
                }
            });
        };

        if(event) {
            $scope.event = event;
            $scope.newEvent = angular.copy(event);

            if(event.privacy === 'public') {
                $scope.eventPrivacy = {
                    label: 'Public',
                    value: 'public'
                };
            }
            else if(event.privacy === 'inviteOnly') {
                $scope.eventPrivacy = {
                    label: 'Invite Only',
                    value: 'inviteOnly'
                };
            }

            if(!$rootScope.userPosition) {
                locationService.getGeo().then(function (data) {
                    $rootScope.userPosition = data;

                    getVenues($rootScope.userPosition);
                });
            }
            else {
                getVenues($rootScope.userPosition);
            }
        }

        $scope.tagOptions = {
            'multiple': true,
            'simple_tags': true,
            'tags': [],
            'tokenSeparators': [","],
            'maximumSelectionSize': 3
        };

        $scope.removePicture = function() {
            $scope.newEvent.pictureUrl = null;
        };

        $scope.privacyOptions = [{
                label: 'Public',
                value: 'public'
            },
            {
                label: 'Invite Only',
                value: 'inviteOnly'
            }
        ];

        $scope.changePrivacy = function(option) {
            $scope.eventPrivacy = option;
        };

        // attempt to get latitude and longitude as address is entered
        $scope.checkLocation = function() {
            if($scope.newEvent.locationName && $scope.newEvent.locationName !== $scope.event.locationName) {
                // first check for Foursquare venue
                for(var i = 0; i < $scope.venues.length; i++) {
                    // if venue is known
                    if($scope.venues[i].name.toLowerCase() === $scope.newEvent.locationName.toLowerCase()) {
                        $scope.newEvent.loc = {
                            type: 'Point',
                            coordinates: [$scope.venues[i].location.lng.toFixed(2), $scope.venues[i].location.lat.toFixed(2)]
                        };
                        return;
                    }
                }

                // if no Foursquare venue found, check against Google Maps
                locationService.checkAddress($scope.newEvent.locationName.split(' ').join('+')).then(function (data) {
                    if(data) {
                        if(data.results.length > 0) {
                            $scope.newEvent.loc = {
                                type: 'Point',
                                coordinates: [data.results[0].geometry.location.lng.toFixed(2), data.results[0].geometry.location.lat.toFixed(2)]
                            };
                            return;
                        }
                    }
                });

                // if still nothing is found, set to the nonsensical coordinates
                $scope.newEvent.loc = {
                    type: 'Point',
                    coordinates: [-180, -90]
                };
            }
        };

        $scope.openDatepicker = function() {
            $timeout(function() {
                $scope.datepickerOpened = true;
            });
        };

        $scope.saveChanges = function() {
            $scope.checkLocation();
            $scope.newEvent.startDate = new Date($scope.newEvent.startDate);

            if(($scope.newEvent.tags.length > 0) && !($scope.newEvent.tags instanceof Array)) {
                $scope.newEvent.tags = $scope.newEvent.tags.split(',');
            }

            // add time to event's startDate for proper querying
            var timeArray = $scope.newEvent.startTime.split(':'),
                hours = parseInt(timeArray[0], 10),
                minutes = parseInt(timeArray[1].replace(/\D/g,''), 10);

            // adjust 24-hour format for am/pm
            if(timeArray[1].toLowerCase().indexOf('pm') !== -1) {
                hours += 12;
            }

            $scope.newEvent.startDate.setHours(hours);
            $scope.newEvent.startDate.setMinutes(minutes);

            $scope.newEvent.privacy = $scope.eventPrivacy.value;

            // if a new event image was chosen, confirm it is an image of the proper size, then upload it before updating the event
            if($scope.newImage.image) {
                // verify that uploaded file is of type "image/x"
                if($scope.newImage.image.file.type.toLowerCase().indexOf("image") === -1) {
                    $scope.editError = "The event picture must be an image.";
                    return;
                }
                // verify that uploaded file is no larger than 3MB
                else if($scope.newImage.image.file.size > 3145728) {
                    $scope.editError = "That image is too large.";
                    return;
                }

                eventService.uploadImage($scope.newImage.image.file, $scope.event._id).then(function () {
                    var getExtension = function(filename) {
                        var i = filename.lastIndexOf('.');
                        return (i < 0) ? '' : filename.substr(i);
                    };

                    $scope.newEvent.pictureUrl = 'https://s3.amazonaws.com/campuslively/event_imgs/' + $scope.event._id + getExtension($scope.newImage.image.file.name);

                    // add picture URL to event
                    eventService.updateEvent($scope.event._id, $scope.newEvent).then(function() {
                        $modalInstance.close();

                        // refresh page to show updated event
                        $state.transitionTo($state.current, $stateParams, {
                          reload: true, inherit: false, notify: true
                        });
                    },
                    function (errorMessage) {
                        $scope.editError = errorMessage;
                        return;
                    });
                },
                function (errorMessage) {
                    $scope.editError = errorMessage;
                    return;
                });
            }
            // if no new image was uploaded, just update event
            else {
                eventService.updateEvent($scope.event._id, $scope.newEvent).then(function() {
                    $modalInstance.close();

                    // refresh page to show updated event
                    $state.transitionTo($state.current, $stateParams, {
                      reload: true, inherit: false, notify: true
                    });
                },
                function (errorMessage) {
                    $scope.editError = errorMessage;
                    return;
                });
            }
        };

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});