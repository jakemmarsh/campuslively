define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('registerCtrl', function ($scope) {
    	$scope.emailSent = false;

    	$scope.schools = ['Boston University', 'University of Maine'];

    	$scope.register = function() {
    		$scope.emailSent = true;
    	}
    });
});