define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', ['$scope', '$rootScope', 'locationService', 'eventService', '$timeout', '$FB', function ($scope, $rootScope, locationService, eventService, $timeout, $FB) {

        // initialize map options
        $scope.mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            draggable: false,
            scrollwheel: false,
            panControl: false
        };
        var locationMarker;

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
            },
            function (errorMessage) {
            });
        };

        if(!$rootScope.userPosition) {
            locationService.getGeo().then(function (data) {
                $rootScope.userPosition = data;
                $scope.locationMap.setCenter(new google.maps.LatLng($rootScope.userPosition.latitude, $rootScope.userPosition.longitude));
                getVenues($rootScope.userPosition);
            },
            function (errorMessage) {
            });
        }
        else {
            $scope.mapOptions.center = new google.maps.LatLng($rootScope.userPosition.latitude, $rootScope.userPosition.longitude);
            getVenues($rootScope.userPosition);
        }

        $scope.showAddressInput = true;
        $scope.eventPosted = false;
        $scope.venues = [];

        $scope.eventPrivacy = {
            label: 'Public',
            value: 'public'
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

        $scope.today = new Date();

        $scope.tagOptions = {
            'multiple': true,
            'simple_tags': true,
            'tags': [],
            'tokenSeparators': [","],
            'maximumSelectionSize': 3
        };

        // in case a venue needs to be created and sent to Foursquare
        var venue = {},
            address = null;

        $scope.$watch('eventLocation', function() {
            $scope.checkLocation();
        });

        // check if entered location already exists from foursquare
        $scope.checkLocation = function() {
            if($scope.eventLocation) {
                for(var i = 0; i < $scope.venues.length; i++) {
                    // if venue is known
                    if($scope.venues[i].name.toLowerCase() === $scope.eventLocation.toLowerCase()) {
                        // hide extra address input
                        $scope.showAddressInput = false;
                        // pan map to venue's location
                        $scope.locationMap.panTo(new google.maps.LatLng($scope.venues[i].location.lat, $scope.venues[i].location.lng));
                        $scope.event.loc = {
                            type: 'Point',
                            coordinates: [$scope.venues[i].location.lng.toFixed(2), $scope.venues[i].location.lat.toFixed(2)]
                        };
                        if(locationMarker) {
                            locationMarker.close();
                        }
                        var contentString = '<h3 class="flush">'+$scope.venues[i].name+'</h3>'+
                                            '<span class="muted nudge-half--bottom">'+$scope.venues[i].location.city+', '+$scope.venues[i].location.state+' '+$scope.venues[i].location.postalCode+'</span>'+
                                            '<a href="https://maps.google.com/maps?daddr='+$scope.venues[i].location.lat+','+$scope.venues[i].location.lng+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
                                            'target="_blank" class="block">Get Directions</a>';
                        locationMarker = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 300,
                            position: new google.maps.LatLng($scope.venues[i].location.lat, $scope.venues[i].location.lng)
                        });
                        locationMarker.open($scope.locationMap);
                        break;
                    }
                    else {
                        $scope.showAddressInput = true;
                    }
                }
            }
            else {
                $scope.showAddressInput = true;
            }
        };

        // attempt to get latitude and longitude as address is entered
        $scope.checkAddress = function() {
            if($scope.locationAddress) {
                locationService.checkAddress($scope.locationAddress.split(' ').join('+')).then(function (data) {
                    if(data) {
                        if(data.results.length > 0) {
                            address = data.results[0];
                            $scope.locationMap.panTo(new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng));
                            $scope.event.loc = {
                                type: 'Point',
                                coordinates: [data.results[0].geometry.location.lng.toFixed(2), data.results[0].geometry.location.lat.toFixed(2)]
                            };
                            if(locationMarker) {
                                locationMarker.close();
                            }
                            var contentString = '<h3 class="flush">'+data.results[0].formatted_address+'</h3>'+
                                                '<a href="https://maps.google.com/maps?daddr='+data.results[0].geometry.location.lat+','+data.results[0].geometry.location.lng+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
                                                'target="_blank" class="block">Get Directions</a>';
                            locationMarker = new google.maps.InfoWindow({
                                content: contentString,
                                maxWidth: 300,
                                position: new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
                            });
                            locationMarker.open($scope.locationMap);
                        }
                    }
                },
                function (errorMessage) {
                });
            }
        };

        $scope.openDatepicker = function() {
            $timeout(function() {
                $scope.datepickerOpened = true;
            });
        };

        $scope.changePrivacy = function(option) {
            $scope.eventPrivacy = option;
        };

        // post event and show necessary message(s)
        $scope.postEvent = function() {
            // create venue and send to foursquare if it is new
       //   if($scope.showAddressInput && (address != null)) {
       //       venue.name = $scope.eventLocation;

       //       // extract all the information from google data to send to foursquare
       //       var tempAddress;
       //       for(var i = 0; i < address.address_components.length; i++) {
       //           for(var j = 0; j < address.address_components[i].types.length; j++) {
       //               if (address.address_components[i].types[j] === 'street_number') {
       //                   tempAddress = address.address_components[i].long_name;
       //               }
       //               else if (address.address_components[i].types[j] === 'route') {
       //                   tempAddress += ' ' + address.address_components[i].long_name;
       //               }
       //               else if (address.address_components[i].types[j] === 'administrative_area_level_1') {
       //                   venue.state = address.address_components[i].long_name;
       //               }
       //               else if (address.address_components[i].types[j] === 'locality') {
       //                   venue.city = address.address_components[i].long_name;
       //               }
       //               else if (address.address_components[i].types[j] === 'postal_code') {
       //                   venue.zip = address.address_components[i].long_name;
       //               }
       //           }
       //       }
       //       venue.address = tempAddress;
       //       venue.ll = address.geometry.location.lat.toFixed(2) + ',' + address.geometry.location.lng.toFixed(2);

       //       // post new venue to foursquare
       //       locationService.createFoursquareVenue(venue).then(function (data) {
                //  console.log(data);
                // },
                // function (errorMessage) {
                //  console.log(errorMessage);
          //       });
       //   }
            // populate remaining parts of event for posting
            if(($scope.event.tags.length > 0) && !($scope.event.tags instanceof Array)) {
                $scope.event.tags = $scope.event.tags.split(',');
            }

            $scope.event.privacy = $scope.eventPrivacy.value;

            $scope.event.school = $rootScope.user.school._id;

            if($scope.eventLocation) {
                $scope.event.locationName = $scope.eventLocation;
            }
            else {
                $scope.event.locationName = $scope.locationAddress;
            }

            // add time to event's startDate for proper querying
            var timeArray = $scope.event.startTime.split(':'),
                hours = parseInt(timeArray[0]),
                minutes = parseInt(timeArray[1].replace(/\D/g,''));

            // adjust 24-hour format for am/pm
            if(timeArray[1].toLowerCase().indexOf('pm') !== -1) {
                hours += 12;
            }

            $scope.event.startDate.setHours(hours);
            $scope.event.startDate.setMinutes(minutes);

            // if no location has been specified, make it a nonsensical location by default
            // TODO: fix this logic?
            if(!$scope.event.loc) {
                $scope.event.loc = {
                    type: 'Point',
                    coordinates: [-180, -90]
                };
            }

            // allow admin users to post events anonymously
            if($scope.anonymous && $rootScope.user.admin === true) {
                $scope.event.creator = null;
            }
            else {
                $scope.event.creator = $rootScope.user._id;
            }

            if($scope.eventImage) {
                // verify that uploaded file is of type "image/x"
                if($scope.eventImage.file.type.toLowerCase().indexOf("image") === -1) {
                    $scope.postError = "The event picture must be an image.";
                    return;
                }
                // verify that uploaded file is no larger than 3MB
                else if($scope.eventImage.file.size > 3145728) {
                    $scope.postError = "That image is too large.";
                    return;
                }
                eventService.postEvent($scope.event).then(function (postedEvent) {
                    var updateParams;
                    eventService.uploadImage($scope.eventImage.file, postedEvent._id).then(function () {
                        var getExtension = function(filename) {
                            var i = filename.lastIndexOf('.');
                            return (i < 0) ? '' : filename.substr(i);
                        },
                        updateParams = {
                            pictureUrl: 'https://s3.amazonaws.com/campuslively/event_imgs/' + postedEvent._id + getExtension($scope.eventImage.file.name)
                        };
                        // create corresponding Facebook open graph object
                        eventService.createFacebookObject(postedEvent).then(function (response) {
                            updateParams.facebookId = response.id;

                            // add facebook object ID and picture URL to event
                            eventService.updateEvent(postedEvent._id, updateParams).then(function(updatedEvent) {
                                $scope.eventPosted = true;
                                $scope.postedEvent = updatedEvent;
                                $rootScope.pageTitle = "Event Posted";

                                // automatically post to Facebook if user is linked and has option enabled
                                if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && updatedEvent.privacy === 'public') {
                                    $FB.login(function (res) {
                                        if (res.authResponse) {
                                            $rootScope.updateFbStatus($rootScope.updateApiMe);
                                            $rootScope.updateApiMe();
                                            $FB.api(
                                                '/me/campuslively:post',
                                                'post',
                                                { event: updatedEvent.facebookId },
                                                function(response) {
                                                    if (!response || response.error) {
                                                        alert(response.error);
                                                    }
                                                    else {
                                                        alert('Publish was successful! Action ID: ' + response.id);
                                                    }
                                                }
                                            );
                                        }
                                    });
                                }
                            },
                            function (errorMessage) {
                                $scope.postError = errorMessage;
                                return;
                            });
                        },
                        // register event as posted even if Facebook object creation fails
                        function () {
                            $scope.eventPosted = true;
                            $scope.postedEvent = postedEvent;
                        });
                    },
                    function (errorMessage) {
                        $scope.postError = errorMessage;
                        return;
                    });
                },
                function (errorMessage) {
                    $scope.postError = errorMessage.message;
                    return;
                });
            }
            else {
                eventService.postEvent($scope.event).then(function (postedEvent) {
                    var updateParams = {};

                    // create corresponding Facebook open graph object
                    eventService.createFacebookObject(postedEvent).then(function (response) {
                        updateParams.facebookId = response.id;

                        // add Facebook object ID to event
                        eventService.updateEvent(postedEvent._id, updateParams).then(function(updatedEvent) {
                            $scope.eventPosted = true;
                            $scope.postedEvent = updatedEvent;
                            $rootScope.pageTitle = "Event Posted";

                            // automatically post to Facebook if user is linked and has option enabled
                            if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && updatedEvent.privacy === 'public') {
                                $FB.login(function (res) {
                                    if (res.authResponse) {
                                        $rootScope.updateFbStatus($rootScope.updateApiMe);
                                        $rootScope.updateApiMe();
                                        $FB.api(
                                            '/me/campuslively:post',
                                            'post',
                                            { event: updatedEvent.facebookId },
                                            function(response) {
                                            }
                                        );
                                    }
                                });
                            }
                        });
                    // register event as posted even if Facebook object creation fails
                    }, function() {
                        $scope.eventPosted = true;
                        $scope.postedEvent = postedEvent;
                    });
                },
                function (errorMessage) {
                    $scope.postError = errorMessage.message;
                    return;
                });
            }
        };
    }]);
});