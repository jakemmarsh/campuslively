define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('modalInstanceCtrl', function ($scope, $modalInstance) {
    	$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
    });
});