define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', function ($scope, $rootScope, $location, $anchorScroll, $timeout, $modal, eventService) {
    	$scope.showDay = false;

      $scope.eventSource = [
	        {
	            title: 'Event1',
	            start: '2013-09-18'
	        },
	        {
	            title: 'Event2',
	            start: '2011-05-05'
	        }
    	];

    	$scope.dayClick = function( date, allDay, jsEvent, view ){
    		if(!$scope.$$phase) {         
          		$scope.$apply(function() {
        				$scope.selectedDay = date;
                $scope.loadingDayEvents = true;
                $scope.dayEvents = [];
                eventService.getEventsBySchoolAndDay($rootScope.user.school._id, $scope.selectedDay).then(function (data, status) {
                  $scope.loadingDayEvents = false;
                  $scope.dayEvents = data;
                  $scope.showDay = true;

                  $scope.$watch('showDay', function(newval){
                      if(newval === true) {
                        // scroll to specific day's events
                        var old = $location.hash();
                        $location.hash('dayEvents');
                        $anchorScroll();
                        $location.hash(old);
                      }
                  });
                }, function(err, status) {
                  console.log(err.message);
                });
          		});        
        	}
	    };

      $scope.calendarOptions = {
          height: 600,
          editable: false,
          header:{
            right: 'today prev,next'
          },
          dayClick: $scope.dayClick
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
        
    });
});