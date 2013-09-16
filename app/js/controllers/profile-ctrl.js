define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams) {
    	if($stateParams.userName == 'jakemmarsh') {
    		$scope.userName = "Jake Marsh";
    	}
    	else {
    		$scope.userName = $stateParams.userName;
    	}
    });
});