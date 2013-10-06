define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('contactCtrl', function ($scope, $rootScope) {
    	$scope.messageSent = false;

    	$scope.sendMessage = function() {
    		$scope.messageSent = true;
    	}
    });
});