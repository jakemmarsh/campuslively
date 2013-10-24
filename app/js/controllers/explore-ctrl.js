define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $rootScope, $modal, locationService, eventService, $timeout) {
    	var oldestId, newestId;
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
				eventService.getEventsBySchool($rootScope.user.school._id, 20).then(function (data, status) {
					$scope.events = data;
					$scope.loading = false;
					if(data.length == 20) {
		                $scope.moreToLoadSchool = true;
		            }
		            else {
		                $scope.moreToLoadSchool = false;
		            }
		            if(data.length > 0) {
			            oldestId = data[data.length-1]._id;
			            newestId = data[0]._id;
			        }
			        $scope.checkForEvents();
				}, function(err, status) {
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
			            eventService.getEventsByLocation($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), 20).then(function (data, status) {
							$scope.events = data;
							$scope.loading = false;
							if(data.length == 20) {
			                	$scope.moreToLoadNearby = true;
				            }
				            else {
				                $scope.moreToLoadNearby = false;
				            }
				            if(data.length > 0) {
					            oldestId = data[data.length-1]._id;
					            newestId = data[0]._id;
					        }
					        $scope.checkForEvents();
						}, function(err, status) {
							$scope.loading = false;
						});
			        },
			        function (errorMessage) {
			            console.log(errorMessage);
			        });
				}
				else {
					eventService.getEventsByLocation($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), 20).then(function (data, status) {
						$scope.events = data;
						$scope.loading = false;
						if(data.length == 20) {
		                	$scope.moreToLoadNearby = true;
			            }
			            else {
			                $scope.moreToLoadNearby = false;
			            }
			            if(data.length > 0) {
				            oldestId = data[data.length-1]._id;
				            newestId = data[0]._id;
				        }
				        $scope.checkForEvents();
					}, function(err, status) {
						$scope.loading = false;
					});
				}
			}
		});

		$scope.loadNew = function() {
			if($scope.currentView == 'school') {
	            eventService.getEventsBySchoolNewer($rootScope.user.school._id, newestId).then(function (data) {
	                if(data.length > 0) {
	                    for(var i = 0; i < data.length; i++) {
	                        $scope.events.unshift(data[i]);
	                    }
	                    newestId = data[0]._id;
	                }
	            },
	            function (errorMessage) {
	            });
        	}
        	else if($scope.currentView == 'nearby') {
        		eventService.getEventsByLocationNewer($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), newestId).then(function (data) {
	                if(data.length > 0) {
	                    for(var i = 0; i < data.length; i++) {
	                        $scope.events.unshift(data[i]);
	                    }
	                    newestId = data[0]._id;
	                }
	            },
	            function (errorMessage) {
	            });
        	}
        };

        // refresh feed every 30 seconds
        $scope.checkForEvents = function() {
            var timeout = $timeout(function() {
                    $scope.loadNew();
                    $scope.checkForEvents();
            }, 30000);
        };

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
    					break;
    				}
    			}
	        },
	        function (errorMessage) {
	        });
    	};

    	$scope.unRsvpToEvent = function(eventId) {
    		eventService.unRsvp(eventId, $rootScope.user._id).then(function (data) {
    			for (var i = 0; i < $scope.events.length; i++) {
    				if($scope.events[i]._id == eventId) {
    					$scope.events[i] = data;
    					break;
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
			$scope.loadingMore = true;
			if($scope.currentView == 'school') {
				eventService.getEventsBySchoolOlder($rootScope.user.school._id, oldestId, 20).then(function (data, status) {
					if(data.length < 20) {
	                    $scope.moreToLoadSchool = false;
	                }
	                if(data.length > 0) {
	                	for(var i = 0; i < data.length; i++) {
							$scope.events.push(data);
						}
						oldestId = data[data.length-1]._id;
	                }
	                $scope.loadingMore = false;
				}, function(err, status) {
					$scope.loadingMore = false;
				});
			}
			else if($scope.currentView == 'nearby') {
				eventService.getEventsByLocationOlder($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), oldestId, 20).then(function (data, status) {
					if(data.length < 20) {
	                    $scope.moreToLoadNearby = false;
	                }
	                if(data.length > 0) {
	                	for(var i = 0; i < data.length; i++) {
							$scope.events.push(data);
						}
						oldestId = data[data.length-1]._id;
	                }
	                $scope.loadingMore = false;
				}, function(err, status) {
					$scope.loadingMore = false;
				});
			}
		};

		$scope.openAttending = function (event) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl',
		      resolve: {
		      	items: function() {
		      		return event.attending;
		      	},
		      	location: null
		      }
		    });
		};
    	
    });
});