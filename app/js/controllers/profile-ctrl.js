define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams, $modal, resolvedUser) {
        console.log(resolvedUser);
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

        $scope.toggleSubscribe = function() {
            $scope.subscribed = !$scope.subscribed;
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