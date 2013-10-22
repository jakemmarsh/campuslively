define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('contactCtrl', function ($scope, $rootScope, contactService) {
    	$scope.sendMessage = function() {
    		contactService.sendMessage($scope.message).then(function (data, status) {
				$scope.sendError = null;
				$scope.messageSent = true;
			}, function(err, status) {
				$scope.sendError = "Failed to send email. Please try again";
			});
    	};
    });
});