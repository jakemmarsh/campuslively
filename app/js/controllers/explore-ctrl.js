define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $rootScope, $modal, locationService, eventService) {
    	locationService.getGeo().then(function (data) {
            $scope.userPosition = data;
        },
        function (errorMessage) {
            console.log(errorMessage);
        });

   		$scope.events = [];
   		eventService.getEventsBySchool($rootScope.user.school._id).then(function (data, status) {
			$scope.events = data;
		}, function(error, status) {
			console.log(err.message);
		});

    	$scope.currentView = 'school';
    	
    	$scope.viewOptions = [{
				label: 'My School',
				value: 'school'
			},
			{
				label: 'Nearby',
				value: 'nearby'
			}
		];

		$scope.currentSort = {
			label: 'by start date',
			value: 'startDate'
		};

		$scope.sortOptions = [{
				label: 'by start date',
				value: 'startDate'
			},
			{
				label: 'by post date',
				value: 'created'
			}
		];

		$scope.changeSort = function(option) {
			$scope.events = [];
			if(option.value == 'school') {
				eventService.getEventsBySchool($rootScope.user.school._id).then(function (data, status) {
					$scope.events = data;
				}, function(error, status) {
					console.log(err.message);
				});
			}
			else if(option.value == 'nearby' && $scope.userPosition) {
				eventService.getEventsByLocation($scope.userPosition).then(function (data, status) {
					$scope.events = data;
				}, function(error, status) {
					console.log(err.message);
				});
			}

			$scope.currentSort = option;
		};

		var formatDate = function(date) {
    		var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    		    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				weekDay = weekdays[date.getDay()],
    		    dayNumber = date.getDate(),
    		    month = months[date.getMonth()],
    		    year = date.getFullYear(),
				formattedDate = weekDay + ", " + month + " " + dayNumber + ", " + year;

    		return formattedDate;
    	};

		$scope.toggleAttending = function(eventId) {
			$scope.attending = !$scope.attending;
		};

		$scope.loadMore = function() {
			console.log('load more events');
		};

		$scope.openRSVP = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'rsvpModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};

		$scope.openAttending = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		};
    	
    });
});