define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $rootScope, $modal, locationService, eventService) {
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

		$scope.$watch('currentView', function() {
			$scope.loading = true;
			$scope.events = [];
			if($scope.currentView == 'school') {
				eventService.getEventsBySchool($rootScope.user.school._id).then(function (data, status) {
					$scope.events = data;
					$scope.loading = false;
				}, function(error, status) {
					console.log(err.message);
					$scope.loading = false;
				});
			}
			else if($scope.currentView == 'nearby') {
				if(!$scope.userPosition) {
					$scope.gettingPosition = true;
					console.log('about to call');
					locationService.getGeo().then(function (data) {
			            $scope.userPosition = data;
			            $scope.gettingPosition = false;
			            $scope.loading = true;
			            eventService.getEventsByLocation($scope.userPosition).then(function (data, status) {
							$scope.events = data;
							$scope.loading = false;
						}, function(error, status) {
							console.log(err.message);
							$scope.loading = false;
						});
			        },
			        function (errorMessage) {
			            console.log(errorMessage);
			        });
				}
				else {
					eventService.getEventsByLocation($scope.userPosition).then(function (data, status) {
						$scope.events = data;
						$scope.loading = false;
					}, function(error, status) {
						console.log(err.message);
						$scope.loading = false;
					});
				}
			}
		});

		$scope.sortOptions = [{
				label: 'by start date',
				value: 'startDate'
			},
			{
				label: 'by post date',
				value: '-created'
			}
		];

		$scope.changeSort = function(option) {
			$scope.currentSort = option;
		};

		$scope.currentSort = {
			label: 'by start date',
			value: 'startDate'
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

    	$scope.isAttending = function(eventId) {
    		for(var i = 0; i < $rootScope.user.attending.length; i++) {
    			if($rootScope.user.attending[i]._id == eventId) {
    				return true;
    			}
    		}
    		return false;
    	};

		$scope.toggleAttending = function(eventId) {
			// make call to update both current user and specified event
		};

		$scope.loadMore = function() {
			// make call to load twenty more events after last ID of currently loaded events
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