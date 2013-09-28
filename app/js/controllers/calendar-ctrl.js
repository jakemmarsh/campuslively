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

    	var formatDate = function(date) {
    		var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    		    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				weekDay = weekdays[date.getDay()],
    		    dayNumber = date.getDate(),
    		    month = months[date.getMonth()],
    		    year = date.getFullYear(),
				formattedDate = weekDay + ", " + month + " " + dayNumber + ", " + year;

    		return formattedDate;

    	}

    	$scope.dayClick = function( date, allDay, jsEvent, view ){
    		if(!$scope.$$phase) {         
          		$scope.$apply(function() {
          			$scope.showDay = true;
    				$scope.selectedDay = formatDate(date);


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
	    }

	    $scope.calendarOptions = {
	        height: 600,
	        editable: false,
	        header:{
	          right: 'today prev,next'
	        },
	        dayClick: $scope.dayClick
      	};

      	$scope.openRSVP = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'rsvpModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		}

		$scope.openAttending = function (eventId) {
		    var modalInstance = $modal.open({
		      templateUrl: 'attendingModal.html',
		      controller: 'modalInstanceCtrl'
		    });
		}
    });
});