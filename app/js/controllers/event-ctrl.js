define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $stateParams, $modal) {
    	$scope.eventId = $stateParams.eventId;

    	$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function (modal) {
		  	if (modal.toLowerCase() == 'rsvp') {
			    var modalInstance = $modal.open({
			      templateUrl: 'rsvpModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			}
			else if (modal.toLowerCase() == 'share') {
				var modalInstance = $modal.open({
			      templateUrl: 'shareModal.html',
			      controller: 'modalInstanceCtrl',
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			}
		};
    });
});