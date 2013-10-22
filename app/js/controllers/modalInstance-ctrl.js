define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('modalInstanceCtrl', function ($scope, $modalInstance, items) {
    	$scope.items = items;

    	$scope.clickLink = function() {
    		$modalInstance.close();
    	};

    	$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    });
});