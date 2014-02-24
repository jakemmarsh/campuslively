define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('peopleListModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'items', function ($scope, $rootScope, $modalInstance, items) {
        if(items) {
            $scope.items = items;
        }

        $scope.clickLink = function() {
    		$modalInstance.close();
    	};

    	$scope.ok = function() {
			$modalInstance.close();
		};
    }]);
});