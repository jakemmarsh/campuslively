define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('postedCtrl', ['$scope', '$rootScope', 'userService', 'eventService', '$FB', function ($scope, $rootScope, userService, eventService, $FB) {
    	var gotPosted = false;
    	$scope.$watch('postedEvent', function() {
    		if($scope.postedEvent && !gotPosted) {
    			$scope.eventUrl = 'http://www.campuslively.com/event/' + $scope.postedEvent._id;

    			$scope.invitees = [];
		    	$scope.loadingUsers = true;
		    	userService.getUsersForInvite($rootScope.user._id, $scope.postedEvent._id).then(function (data, status) {
		            $scope.users = data;
		            $scope.loadingUsers = false;
		        },
		        function (errorMessage, status) {
		        	$scope.loadingUsers = false;
		        });
		        gotPosted = true;
    		}
    	});

        $scope.invitees = [];
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

                eventService.inviteUsers($scope.postedEvent._id, $rootScope.user._id, dataToSend).then(function (data) {
                    $scope.invitesSent = true;
                },
                function (errorMessage) {
                    $scope.inviteError = errorMessage;
                });
            }
        };

        $scope.shareEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui({
                    method: 'feed',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: $scope.event.pictureUrl,
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
            else {
                $FB.ui({
                    method: 'feed',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: 'http://campuslively.s3.amazonaws.com/assets/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
        };

        $scope.sendEvent = function() {
            if($scope.postedEvent.pictureUrl) {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.postedEvent.title,
                    picture: $scope.postedEvent.pictureUrl,
                    link: $scope.eventUrl,
                    description: $scope.postedEvent.description
                }, null);
            }
            else {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.postedEvent.title,
                    picture: 'http://campuslively.s3.amazonaws.com/assets/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.postedEvent.description
                }, null);
            }
        };

        $scope.openTweet = function() {
            var width = 570,
                height = 255,
                left = (screen.width/2)-(width/2),
                top = (screen.height/2)-(height/2),
                url = 'https://twitter.com/share?url=http://www.campuslively.com/event/' + $scope.postedEvent._id + '&text=' + $scope.postedEvent.title + ' - &hashtags=campuslively';
            
            window.open(url, 'Tweet Event', 'toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, resizable=yes, width='+width+', height='+height+', top='+top+', left='+left);
        };
    }]);
});