define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('modalInstanceCtrl', ['$scope', '$rootScope', '$modalInstance', '$FB', '$location', '$state', '$stateParams', 'items', 'location', 'event', 'eventService', 'userService', 'localStorageService', 'locationService', function ($scope, $rootScope, $modalInstance, $FB, $location, $state, $stateParams, items, location, event, eventService, userService, localStorageService, locationService) {
        // call to foursquare to get list of venues near user's location
        var getVenues = function(position) {
            locationService.getFoursquareVenues(position).then(function (data) {
                $scope.venues = (data.response.venues);
            },
            function (errorMessage) {
            });
        };

    	if(items) {
            $scope.items = items;
            $scope.invitees = [];
        }

        if(location) {
            $scope.mapOptions = {
                center: new google.maps.LatLng(location.coordinates[1], location.coordinates[0]),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                scrollwheel: false,
                panControl: false
            };

            $scope.placeMarker = function(map) {
                var contentString = '<h3 class="flush">'+location.address+'</h3>'+
                                    '<a href="https://maps.google.com/maps?daddr='+location.coordinates[1]+','+location.coordinates[0]+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
                                    'target="_blank" class="block">Get Directions</a>',
                
                locationMarker = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300,
                    position: new google.maps.LatLng(location.coordinates[1], location.coordinates[0])
                });

                locationMarker.open(map);
            };
        }

        if(event) {
            $scope.event = event;
            $scope.newEvent = event;
            $scope.eventUrl = 'http://www.campuslively.com/event/'+ $scope.event._id;

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

        $scope.shareEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui({
                    method: 'feed',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: $scope.event.pictureUrl,
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
            else {
                $FB.ui({
                    method: 'feed',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: 'http://campuslively.s3.amazonaws.com/assets/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
        };

        $scope.sendEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: $scope.event.pictureUrl,
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
            else {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: 'http://campuslively.s3.amazonaws.com/assets/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
        };

        $scope.openTweet = function() {
            var width = 570,
                height = 255,
                left = (screen.width/2)-(width/2),
                top = (screen.height/2)-(height/2),
                url = 'https://twitter.com/share?url=http://www.campuslively.com/event/' + $scope.event._id + '&text=' + $scope.event.title + ' - &hashtags=campuslively';
            
            window.open(url, 'Tweet Event', 'toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, resizable=yes, width='+width+', height='+height+', top='+top+', left='+left);
        };

        $scope.toggleInvitee = function(userId) {
            if($scope.invitees.indexOf(userId) > -1) {
                $scope.invitees.splice($scope.invitees.indexOf(userId), 1);
            }
            else {
                $scope.invitees.push(userId);
            }
        };

        $scope.isInvitee = function(userId) {
            if($scope.invitees.indexOf(userId) > -1) {
                return true;
            }
            return false;
        };

        $scope.sendInvites = function() {
            var dataToSend = {};
            if($scope.invitees.length > 0) {
                dataToSend.recipientIds = $scope.invitees;

                eventService.inviteUsers($scope.event._id, $rootScope.user._id, dataToSend).then(function (data) {
                    $modalInstance.close();
                },
                function (errorMessage) {
                });
            }
        };

    	$scope.clickLink = function() {
    		$modalInstance.close();
    	};

        $scope.deleteUser = function() {
            userService.deleteUser($rootScope.user._id).then(function (data, status) {
                $modalInstance.close();
                localStorageService.clearAll();
                $rootScope.user = null;
                $location.path('/');
            }, 
            function (errorMessage, status) {

            });
        };

        $scope.deleteEvent = function() {
            if($scope.event.creator._id === $rootScope.user._id || $rootScope.user.admin) {
                eventService.deleteEvent($scope.event._id).then(function (data) {
                    $modalInstance.close();
                    $location.path('/feed');
                },
                function (errorMessage, status) {
                });
            }
        };

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

    	$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});