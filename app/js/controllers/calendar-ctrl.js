define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', function ($scope) {
    	$scope.calendarOptions = {
	        height: 600,
	        editable: false,
	        header:{
	          left: 'month agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        dayClick: $scope.dayClick
      	};

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
	        console.log('Day Clicked ' + date);
	    };
    });
});