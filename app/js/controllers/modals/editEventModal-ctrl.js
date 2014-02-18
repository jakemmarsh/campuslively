define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('editEventModalCtrl', ['$scope', '$rootScope', '$modalInstance', '$state', '$stateParams', 'event', 'eventService', 'locationService', function ($scope, $rootScope, $modalInstance, $state, $stateParams, event, eventService, locationService) {
        // call to foursquare to get list of venues near user's location
        var getVenues = function(position) {
            locationService.getFoursquareVenues(position).then(function (data) {
                $scope.venues = (data.response.venues);
            },
            function (errorMessage) {
            });
        };

        if(event) {
            $scope.event = event;
            $scope.newEvent = event;

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
                },
                function (errorMessage) {
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
            if($scope.newEvent.locationName) {
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
                        }
                    }
                    return;
                },
                function (errorMessage) {
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

            // add time to event's startDate for proper querying
            var timeArray = $scope.newEvent.startTime.split(':'),
                hours = parseInt(timeArray[0]),
                minutes = parseInt(timeArray[1].replace(/\D/g,''));

            // adjust 24-hour format for am/pm
            if(timeArray[1].toLowerCase().indexOf('pm') !== -1) {
                hours += 12;
            }

            $scope.newEvent.startDate.setHours(hours);
            $scope.newEvent.startDate.setMinutes(minutes);

            $scope.newEvent.privacy = $scope.eventPrivacy.value;

            eventService.updateEvent($scope.event._id, $scope.newEvent).then(function (data, status) {
                $modalInstance.close();

                // refresh page to show updated event
                $state.transitionTo($state.current, $stateParams, { 
                  reload: true, inherit: false, notify: false 
                });
            }, 
            function (errorMessage, status) {
                $modalInstance.close();

                // refresh page to show updated event
                $state.transitionTo($state.current, $stateParams, { 
                  reload: true, inherit: false, notify: false 
                });
            });
        };

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});