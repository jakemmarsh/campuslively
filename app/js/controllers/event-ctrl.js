define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $stateParams, $modal) {
    	$scope.eventId = $stateParams.eventId;

    	$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function (modal) {
		  	if (modal.toLowerCase() == 'rsvp') {
			    var modalInstance = $modal.open({
			      templateUrl: 'rsvpModal.html',
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
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    });
			}

		    modalInstance.result.then(function (selectedItem) {
		    	$scope.selected = selectedItem;
		    }, function () {
		    	$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.okModal = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancelModal = function () {
			$modalInstance.dismiss('cancel');
		};
    });
});