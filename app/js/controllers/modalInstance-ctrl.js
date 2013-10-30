define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('modalInstanceCtrl', ['$scope', '$modalInstance', '$FB', 'items', 'location', 'event', function ($scope, $modalInstance, $FB, items, location, event) {
    	if(items) {
            $scope.items = items;
        }

        if(location) {
            $scope.mapOptions = {
                center: new google.maps.LatLng(location.coordinates[0], location.coordinates[1]),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                scrollwheel: false,
                panControl: false
            };
        }

        $scope.placeMarker = function(map) {
            var contentString = '<h3 class="flush">'+location.address+'</h3>'+
                                '<a href="https://maps.google.com/maps?daddr='+location.coordinates[0]+','+location.coordinates[1]+'&hl=en&t=m&mra=mift&mrsp=1&sz=5&z=18"'+
                                'target="_blank" class="block">Get Directions</a>',
            
            locationMarker = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300,
                position: new google.maps.LatLng(location.coordinates[0], location.coordinates[1])
            });

            locationMarker.open(map);
        };

        if(event) {
            $scope.event = event;
            $scope.eventUrl = 'http://www.eventlively.com/event/'+ $scope.event._id;
        }

        $scope.shareEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui(
                    {
                        method: 'feed',
                        name: $scope.event.title,
                        picture: $scope.event.pictureUrl,
                        link: $scope.eventUrl,
                        description: $scope.event.description
                    },
                    null
                );
            }
            else {
                $FB.ui(
                    {
                        method: 'feed',
                        name: $scope.event.title,
                        picture: 'http://www.eventlively.com/img/home_logo.png',
                        link: 'http://www.eventlively.com/event/'+ $scope.event._id,
                        description: $scope.event.description
                    },
                    null
                );
            }
        };

        $scope.sendEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui(
                    {
                        method: 'send',
                        name: $scope.event.title,
                        picture: $scope.event.pictureUrl,
                        link: $scope.eventUrl,
                        description: $scope.event.description
                    },
                    null
                );
            }
            else {
                $FB.ui(
                    {
                        method: 'send',
                        name: $scope.event.title,
                        picture: 'http://www.eventlively.com/img/home_logo.png',
                        link: 'http://www.eventlively.com/event/'+ $scope.event._id,
                        description: $scope.event.description
                    },
                    null
                );
            }
        };

        $scope.tweetEvent = function() {

        };

    	$scope.clickLink = function() {
    		$modalInstance.close();
    	};

    	$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});