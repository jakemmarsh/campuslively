define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('forgotCtrl', function ($scope, $rootScope) {
    	$scope.sendEmail = function() {
    		console.log('send');
    	}
    });
});