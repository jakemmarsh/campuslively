define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('contactCtrl', ['$scope', '$rootScope', 'contactService', function ($scope, $rootScope, contactService) {
    	$scope.sendMessage = function() {
            // set reply address if not already entered
            if(!$scope.message.replyAddress || $scope.message.replyAddress.length === 0) {
                $scope.message.replyAddress = $rootScope.user.email;
            }
            
    		contactService.sendMessage($scope.message).then(function (data) {
				$scope.sendError = null;
				$scope.messageSent = true;
			}, function() {
				$scope.sendError = "Failed to send email. Please try again";
			});
    	};
    }]);
});