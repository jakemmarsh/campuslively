define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('loginCtrl', function ($scope) {
    	$scope.login = function() {
    		console.log('login');
    	}
    });
});