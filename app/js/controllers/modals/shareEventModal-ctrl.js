define(['../index'], function (controllers) {
    'use strict';
    controllers.controller('shareEventModalCtrl', ['$scope', '$rootScope', '$modalInstance', '$FB', 'event', function ($scope, $rootScope, $modalInstance, $FB, event) {
        if(event) {
            $scope.event = event;
            $scope.eventUrl = 'http://www.campuslively.com/event/'+ $scope.event._id;
        }

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
                    picture: 'http://assets.campuslively.com/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
        };

        $scope.sendEvent = function() {
            if($scope.event.pictureUrl) {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: $scope.event.pictureUrl,
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
            else {
                $FB.ui({
                    method: 'send',
                    display: 'popup',
                    name: $scope.event.title,
                    picture: 'http://assets.campuslively.com/img/fb_logo.png',
                    link: $scope.eventUrl,
                    description: $scope.event.description
                }, null);
            }
        };

        $scope.openTweet = function() {
            var width = 570,
                height = 255,
                left = (screen.width/2)-(width/2),
                top = (screen.height/2)-(height/2),
                url = 'https://twitter.com/share?url=http://www.campuslively.com/event/' + $scope.event._id + '&text=' + $scope.event.title + ' - &hashtags=campuslively';

            window.open(url, 'Tweet Event', 'toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, resizable=yes, width='+width+', height='+height+', top='+top+', left='+left);
        };

    	$scope.ok = function() {
			$modalInstance.close();
		};
    }]);
});