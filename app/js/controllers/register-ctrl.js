define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerCtrl', function ($scope) {
    	$scope.emailSent = false;
    	$scope.userType = null;

    	$scope.schools = ['Boston University', 'University of Maine'];

    	$scope.register = function() {
    		$scope.emailSent = true;
    	}
    });
});