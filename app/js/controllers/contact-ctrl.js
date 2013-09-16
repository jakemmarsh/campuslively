define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('contactCtrl', function ($scope) {
    	$scope.messageSent = false;

    	$scope.sendMessage = function() {
    		$scope.messageSent = true;
    	}
    });
});