define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $stateParams, $modal) {
    	$scope.eventId = $stateParams.eventId;

    	$scope.items = ['item1', 'item2', 'item3'];

		  $scope.open = function () {

		    var modalInstance = $modal.open({
		      templateUrl: 'myModalContent.html',
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		    });
		  };
    });
});