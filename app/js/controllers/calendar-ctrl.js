define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', function ($scope, $location, $anchorScroll, $timeout, $modal) {
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
          			$scope.showDay = true;
        				$scope.selectedDay = date;


        				$scope.$watch('showDay', function(newval){
        					if(newval === true) {
        						// scroll to specific day's events
    		    				var old = $location.hash();
    		    				$location.hash('dayEvents');
    		    				$anchorScroll();
    		    				// reset to old to keep any additional routing logic from kicking in
    		    				$location.hash(old);
        					}
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
        
    });
});