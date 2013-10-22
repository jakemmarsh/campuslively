define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', function ($scope, $rootScope, $location, $anchorScroll, $timeout, $modal, eventService) {
    	$scope.showDay = false;

      $scope.events = [];
      eventService.getEventsBySchool($rootScope.user.school._id).then(function (data, status) {
        for(var i = 0; i < data.length; i++) {
          var event = {
            title: data[i].title,
            start: data[i].startDate,
            editable: false
          };
          $scope.events.push(event);
        }
      }, function(err, status) {
      
      });

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
          events: $scope.events,
          dayClick: $scope.dayClick
      };

    	$scope.rsvpToEvent = function(eventId) {
          eventService.rsvp(eventId, $rootScope.user._id).then(function (data) {
              for (var i = 0; i < $scope.dayEvents.length; i++) {
                  if($scope.dayEvents[i]._id == eventId) {
                      $scope.dayEvents[i] = data;
                      break;
                  }
              }
          },
          function (errorMessage) {
              console.log(errorMessage);
          });
      };

      $scope.unRsvpToEvent = function(eventId) {
          eventService.unRsvp(eventId, $rootScope.user._id).then(function (data) {
              for (var i = 0; i < $scope.dayEvents.length; i++) {
                  if($scope.dayEvents[i]._id == eventId) {
                      $scope.dayEvents[i] = data;
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

  		$scope.openAttending = function (event) {
          var modalInstance = $modal.open({
            templateUrl: 'attendingModal.html',
            controller: 'modalInstanceCtrl',
            resolve: {
              items: function() {
                return event.attending;
              }
            }
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