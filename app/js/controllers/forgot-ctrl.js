define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('forgotCtrl', function ($scope) {
    	$scope.sendEmail = function() {
    		console.log('send');
    	}
    });
});