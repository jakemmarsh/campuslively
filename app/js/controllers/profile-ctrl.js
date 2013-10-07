define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $rootScope, $stateParams, $modal, resolvedUser, userService) {
        $scope.profile = resolvedUser;
    	
    	if($stateParams.userName == 'jakemmarsh') {
    		$scope.userName = "Jake Marsh";
    	}
    	else {
    		$scope.userName = $stateParams.userName;
    	}

        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            slides.push({
                image: 'http://placekitten.com/958/200'
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }

    	$scope.currentSort = {
            label: 'by start date',
            value: 'day'
        };

        $scope.sortOptions = [{
                label: 'by start date',
                value: 'day'
            },
            {
                label: 'by post date',
                value: 'posted'
            }
        ];

        $scope.changeSort = function(option) {
            $scope.currentSort = option;
        };

        $scope.isSubscribed = function() {
            for(var i = 0; i < $rootScope.user.subscriptions.length; i++) {
                if($rootScope.user.subscriptions[i] == $scope.profile._id) {
                    return true;
                }
            }

            return false;
        };

        $scope.toggleSubscribe = function() {
            if($scope.isSubscribed()) {
                userService.unsubscribe($rootScope.user._id, $scope.profile._id).then(function (data, status) {
                    $rootScope.user = data;
                },
                function (errorMessage, status) {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            else {
                userService.subscribe($rootScope.user._id, $scope.profile._id).then(function (data, status) {
                    $rootScope.user = data;
                },
                function (errorMessage, status) {
                    $scope.subscribeError = "Error occurred while subscribing to user.";
                });
            }
            $scope.isSubscribed();
        };

        $scope.toggleAttending = function(eventId) {
            $scope.attending = !$scope.attending;
        };

        $scope.openAttending = function (eventId) {
            var modalInstance = $modal.open({
              templateUrl: 'attendingModal.html',
              controller: 'modalInstanceCtrl'
            });
        };

        $scope.openLocation = function () {
            var modalInstance = $modal.open({
              templateUrl: 'locationModal.html',
              controller: 'modalInstanceCtrl'
            });
        };
    });
});