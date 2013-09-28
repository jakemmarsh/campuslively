define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerCtrl', function ($scope) {
    	$scope.emailSent = false;

    	$scope.register = function() {
    		$scope.emailSent = true;
    	}
    });
});