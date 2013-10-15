define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', function ($scope, $rootScope, schoolService, locationService, eventService, $timeout) {
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

	    // call to foursquare to get list of venues near user's location
    	var getVenues = function(position) {
    		locationService.getFoursquareVenues(position).then(function (data) {
    			$scope.venues = (data.response.venues);
		    },
		    function (errorMessage) {
		        console.log(errorMessage);
		    });
    	};

    	if(!$rootScope.userPosition) {
	    	locationService.getGeo().then(function (data) {
	            $rootScope.userPosition = data;
	            $scope.locationMap.setCenter(new google.maps.LatLng($rootScope.userPosition.latitude, $rootScope.userPosition.longitude));
	            getVenues($rootScope.userPosition);
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
	    }
	    else {
	    	$scope.mapOptions.center = new google.maps.LatLng($rootScope.userPosition.latitude, $rootScope.userPosition.longitude);
	        getVenues($rootScope.userPosition);
	    }

    	schoolService.getAllSchools().then(function (data, status) {
    		$scope.schools = data;
    	}, function(errorMessage, status) {
    		console.log(errorMessage);
    	});

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
		    			$scope.locationPoint = [$scope.venues[i].location.lat, $scope.venues[i].location.lng];
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
			    			$scope.locationPoint = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
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
	    	var event = {};

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
	   //  		locationService.createFoursquareVenue(venue).then(function (data) {
				// 	console.log(data);
				// },
				// function (errorMessage) {
				// 	console.log(errorMessage);
		  //       });
	    	}
	    	// populate event for posting
	    	event.title = $scope.eventTitle;
	    	event.creator = $rootScope.user._id;
	    	event.privacy = $scope.eventPrivacy.value;
	    	if($scope.eventDescription) {
	    		event.description = $scope.eventDescription;
	    	}
	    	// location name
	    	// location point
	    	event.startDate = new Date($scope.eventDate);
	    	if($scope.startTime) {
	    		event.startTime = $scope.startTime;
	    	}
	    	if($scope.eventTags) {
	    		event.tags = $scope.eventTags;
	    	}
	    	if($scope.eventSchool) {
	    		event.school = $scope.eventSchool;
	    	}
	    	if($scope.eventLocation) {
	    		event.locationName = $scope.eventLocation;
	    	}
	    	else {
	    		event.locationName = $scope.locationAddress;
	    	}
	    	if($scope.locationPoint) {
	    		event.locationPoint = $scope.locationPoint;
	    	}

	    	eventService.postEvent(event).then(function (data) {
		    	if($scope.eventImage) {
		    		var formData = new FormData();
		    		formData.append('image', $scope.eventImage.resized);

		    		// post image to amazon SES, set URL as event.pictureUrl
		    	}
		    	else {
		    		$scope.eventPosted = true;
		    	}
		    },
		    function (errorMessage, status) {
		    	$scope.postError = errorMessage.message;
		    });
	    };
    });
});