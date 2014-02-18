define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('attendingEventModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'items', function ($scope, $rootScope, $modalInstance, items) {
        if(items) {
            $scope.items = items;
        }

    	$scope.ok = function() {
			$modalInstance.close();
		};
    }]);
});