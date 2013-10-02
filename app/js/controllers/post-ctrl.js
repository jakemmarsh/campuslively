define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postCtrl', function ($scope, $rootScope, locationService) {
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

    	// make call to foursquare to get list of venues near user's location
    	var getVenues = function(position) {
    		locationService.getFoursquareVenues(position).then(function (data) {
    			for(var i = 0; i < data.response.venues.length; i++) {
    				$scope.venues.push(data.response.venues[i]);
    			}
		    },
		    function (errorMessage) {
		        console.log(errorMessage);
		    });
    	}

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

	    locationService.getGeo().then(function (data) {
            $scope.userPosition = data;
            $scope.locationMap.setCenter(new google.maps.LatLng($scope.userPosition.latitude, $scope.userPosition.longitude));
            getVenues($scope.userPosition);
        },
        function (errorMessage) {
            console.log(errorMessage);
        });

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
	    }

	    // attempt to get latitude and longitude as address is entered
	    $scope.checkAddress = function() {
	    	if($scope.locationAddress) {
		    	locationService.checkAddress($scope.locationAddress.split(' ').join('+')).then(function (data) {
					if(data) {
			    		if(data.results.length > 0) {
			    			address = data.results[0];
			    			$scope.locationMap.panTo(new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng));
			    		}
			    	}
				},
				function (errorMessage) {
					console.log(errorMessage);
		        });
		    }
	    }

	    $scope.openDatepicker = function() {
			$timeout(function() {
				$scope.datepickerOpened = true;
			});
		};

	    $scope.changePrivacy = function(option) {
			$scope.eventPrivacy = option;
		}

	    // post event and show necessary message(s)
	    $scope.postEvent = function() {
	    	var formData = new FormData();
			formData.append('image', $scope.eventImage.resized, $scope.eventImage.resized.name);

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
	    	$scope.eventPosted = true;
	    }
    });
});