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
					console.log(data);
					$scope.loading = false;
				}, function(error, status) {
					console.log(err.message);
					$scope.loading = false;
				});
			}
			else if($scope.currentView == 'nearby') {
				if(!$rootScope.userPosition) {
					$scope.gettingPosition = true;
					locationService.getGeo().then(function (data) {
			            $rootScope.userPosition = data;
			            $scope.gettingPosition = false;
			            $scope.loading = true;
			            eventService.getEventsByLocation($rootScope.userPosition).then(function (data, status) {
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
					eventService.getEventsByLocation($rootScope.userPosition).then(function (data, status) {
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

		$scope.rsvpToEvent = function(eventId) {
    		eventService.rsvp(eventId, $rootScope.user._id).then(function (data) {
    			for (var i = 0; i < $scope.events.length; i++) {
    				if($scope.events[i]._id == eventId) {
    					$scope.events[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
    	};

    	$scope.unRsvpToEvent = function(eventId) {
    		eventService.unRsvp(eventId, $rootScope.user._id).then(function (data) {
    			for (var i = 0; i < $scope.events.length; i++) {
    				if($scope.events[i]._id == eventId) {
    					$scope.events[i] = data;
    				}
    			}
	        },
	        function (errorMessage) {
	            console.log(errorMessage);
	        });
    	};

    	$scope.isAttending = function(event) {
    		for(var i = 0; i < event.attending.length; i++) {
    			if(event.attending[i]._id == $rootScope.user._id) {
    				return true;
    			}
    		}
    		return false;
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