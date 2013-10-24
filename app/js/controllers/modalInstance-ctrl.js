define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('modalInstanceCtrl', ['$scope', '$modalInstance', 'items', 'location', function ($scope, $modalInstance, items, location) {
    	$scope.items = items;

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