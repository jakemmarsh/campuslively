define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('exploreCtrl', function ($scope, $modal, resolvedLocation) {
    	$scope.userPosition = resolvedLocation;
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
		}

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

		$scope.events = [{
    		title: 'DJ Hardo',
    		location: 'Bijou Nightclub',
    		day: new Date("June 9, 2013"),
    		formattedDay: formatDate(new Date("June 9, 2013")),
    		time: '11:30pm',
    		description: 'Famous Miami-based DJ Hardo LIVE at Bijou tonight! Tickets are $20 at the door. Order now and get them for $15! www.bijounightclub.com',
    		tags: ['club', 'live music'],
    		posted: new Date()
    	},
    	{
    		title: 'DJ Hardo Posted June 8th',
    		location: 'Bijou Nightclub',
    		day: new Date("June 10, 2013"),
    		formattedDay: formatDate(new Date("June 10, 2013")),
    		time: '11:30pm',
    		description: 'Famous Miami-based DJ Hardo LIVE at Bijou tonight! Tickets are $20 at the door. Order now and get them for $15! www.bijounightclub.com',
    		tags: ['club', 'live music'],
    		posted: new Date("June 8, 2013")
    	}];

		$scope.toggleAttending = function(eventId) {
			$scope.attending = !$scope.attending;
		}

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