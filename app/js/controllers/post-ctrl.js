define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', ['$scope', '$rootScope', 'locationService', 'eventService', '$timeout', function ($scope, $rootScope, locationService, eventService, $timeout) {
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
    			$scope.venues = (data.response.venues);
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
		    		if($scope.venues[i].name.toLowerCase() == $scope.eventLocation.toLowerCase()) {
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
					console.log(errorMessage);
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
	    	if($scope.showAddressInput && (address != null)) {
	    		venue.name = $scope.eventLocation;

	    		// extract all the information from google data to send to foursquare
	    		var tempAddress;
	    		for(var i = 0; i < address.address_components.length; i++) {
	    			for(var j = 0; j < address.address_components[i].types.length; j++) {
	    				if (address.address_components[i].types[j] == 'street_number') {
	    					tempAddress = address.address_components[i].long_name;
	    				}
	    				else if (address.address_components[i].types[j] == 'route') {
	    					tempAddress += ' ' + address.address_components[i].long_name;
	    				}
	    				else if (address.address_components[i].types[j] == 'administrative_area_level_1') {
	    					venue.state = address.address_components[i].long_name;
	    				}
	    				else if (address.address_components[i].types[j] == 'locality') {
	    					venue.city = address.address_components[i].long_name;
	    				}
	    				else if (address.address_components[i].types[j] == 'postal_code') {
	    					venue.zip = address.address_components[i].long_name;
	    				}
	    			}
	    		}
	    		venue.address = tempAddress;
	    		venue.ll = address.geometry.location.lat.toFixed(2) + ',' + address.geometry.location.lng.toFixed(2);

	    		// post new venue to foursquare
	    		locationService.createFoursquareVenue(venue).then(function (data) {
					console.log(data);
				},
				function (errorMessage) {
					console.log(errorMessage);
		        });
	    	}
	    	// populate remaining parts of event for posting
	    	$scope.event.creator = $rootScope.user._id;
	    	$scope.event.privacy = $scope.eventPrivacy.value;
	    	$scope.event.school = $rootScope.user.school._id;
	    	if($scope.eventLocation) {
	    		$scope.event.locationName = $scope.eventLocation;
	    	}
	    	else {
	    		$scope.event.locationName = $scope.locationAddress;
	    	}

	    	if($scope.eventImage) {
	    		var eventId;
	    		eventService.postEvent($scope.event).then(function (data) {
	    			eventId = data._id;
			    	eventService.uploadImage($scope.eventImage.file, eventId).then(function () {
			    		var getExtension = function(filename) {
						    var i = filename.lastIndexOf('.');
			    			return (i < 0) ? '' : filename.substr(i);
						},
			    		updateParams = {
			    			pictureUrl: 'https://s3.amazonaws.com/campuslively/event_imgs/' + eventId + getExtension($scope.eventImage.file.name)
			    		};

			    		eventService.updateEvent(eventId, updateParams).then(function(data) {
			    			$scope.eventPosted = true;
			    			$scope.postedEvent = data;
			    		},
			    		function (errorMessage, status) {
			    			$scope.postError = errorMessage;
			    		});
			    	}, 
			    	function (errorMessage, status) {
			    		$scope.postError = errorMessage;
			    	});
			    },
			    function (errorMessage, status) {
			    	$scope.postError = errorMessage.message;
			    });
	    	}
	    	else {
		    	eventService.postEvent($scope.event).then(function (data) {
			    	$scope.eventPosted = true;
			    	$scope.postedEvent = data;
			    },
			    function (errorMessage, status) {
			    	$scope.postError = errorMessage.message;
			    });
			}
	    };
    }]);
});