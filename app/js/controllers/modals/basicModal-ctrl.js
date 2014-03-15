define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('basicModalCtrl', ['$scope', '$rootScope', '$modalInstance', '$location', 'items', 'location', 'event', 'eventService', 'userService', 'localStorageService', function ($scope, $rootScope, $modalInstance, $location, items, location, event, eventService, userService, localStorageService) {
        if(items) {
            $scope.items = items;
        }

        if(location && location.coordinates) {
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
            $scope.eventUrl = 'http://www.campuslively.com/event/'+ $scope.event._id;
        }

    	$scope.clickLink = function() {
    		$modalInstance.close();
    	};

        $scope.deleteUser = function() {
            userService.deleteUser($rootScope.user._id).then(function (data) {
                $modalInstance.close();
                localStorageService.clearAll();
                $rootScope.user = null;
                $location.path('/');
            }, function() {
                $modalInstance.close();
                localStorageService.clearAll();
                $rootScope.user = null;
                $location.path('/');
            });
        };

        $scope.deleteEvent = function() {
            if($scope.event.creator._id === $rootScope.user._id || $rootScope.user.admin) {
                eventService.deleteEvent($scope.event._id).then(function (data) {
                    $modalInstance.close();
                    $location.path('/feed');
                }, function() {
                    $modalInstance.close();
                    $location.path('/feed');
                });
            }
        };

    	$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});