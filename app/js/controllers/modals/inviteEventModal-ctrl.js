define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('inviteEventModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'items', 'event', 'eventService', function ($scope, $rootScope, $modalInstance, items, event, eventService) {
    	if(items) {
            $scope.items = items;
            $scope.invitees = [];
        }

        if(event) {
            $scope.event = event;
            $scope.eventUrl = 'http://www.campuslively.com/event/'+ $scope.event._id;
        }

        $scope.toggleInvitee = function(userId) {
            if($scope.invitees.indexOf(userId) > -1) {
                $scope.invitees.splice($scope.invitees.indexOf(userId), 1);
            }
            else {
                $scope.invitees.push(userId);
            }
        };

        $scope.isInvitee = function(userId) {
            if($scope.invitees.indexOf(userId) > -1) {
                return true;
            }
            return false;
        };

        $scope.sendInvites = function() {
            var dataToSend = {};
            if($scope.invitees.length > 0) {
                dataToSend.recipientIds = $scope.invitees;

                eventService.inviteUsers($scope.event._id, $rootScope.user._id, dataToSend).then(function (data) {
                    $modalInstance.close();
                },
                function (errorMessage) {
                    $scope.inviteError = errorMessage;
                });
            }
        };

    	$scope.clickLink = function() {
    		$modalInstance.close();
    	};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
    }]);
});