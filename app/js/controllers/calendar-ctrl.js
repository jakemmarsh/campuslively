define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$modal', 'eventService', 'locationService', function ($scope, $rootScope, $location, $anchorScroll, $modal, eventService, locationService) {
    	$scope.showDay = false;

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

      $scope.events = [];
      $scope.$watch('currentView', function() {
        // remove any previous events before adding to avoid duplicates
        $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
        $scope.events = [];

        $scope.showDay = false;
        if($scope.currentView == 'school') {
          eventService.getEventsBySchool($rootScope.user._id, $rootScope.user.school._id).then(function (data, status) {
            for(var i = 0; i < data.length; i++) {
              var event = {
                title: data[i].title,
                start: data[i].startDate,
                editable: false,
                id: data[i]._id
              };
              // highlight events that user has RSVP'd to
              for(var j = 0; j < data[i].attending.length; j++) {
                if(data[i].attending[j]._id == $rootScope.user._id) {
                  event.backgroundColor = '#4fbda2';
                  break;
                }
              }
              $scope.events.push(event);
            }
            $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
          }, function(err, status) {
          
          });
        }
        else if($scope.currentView == 'nearby') {
          if(!$rootScope.userPosition) {
            locationService.getGeo().then(function (data) {
              $rootScope.userPosition = data;
              eventService.getEventsByLocation($rootScope.user._id, $rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2)).then(function (data, status) {
                for(var i = 0; i < data.length; i++) {
                  var event = {
                    title: data[i].title,
                    start: data[i].startDate,
                    editable: false,
                    id: data[i]._id
                  };
                  // highlight events that user has RSVP'd to
                  for(var j = 0; j < data[i].attending.length; j++) {
                    if(data[i].attending[j]._id == $rootScope.user._id) {
                      event.backgroundColor = '#4fbda2';
                      break;
                    }
                  }
                  $scope.events.push(event);
                }
                $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
              }, function(err, status) {
              });
            },
            function (errorMessage) {
                console.log(errorMessage);
            });
          }
          else {
            eventService.getEventsByLocation($rootScope.user._id, $rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2)).then(function (data, status) {
              for(var i = 0; i < data.length; i++) {
                var event = {
                  title: data[i].title,
                  start: data[i].startDate,
                  editable: false,
                  id: data[i]._id
                };
                // highlight events that user has RSVP'd to
                for(var j = 0; j < data[i].attending.length; j++) {
                  if(data[i].attending[j]._id == $rootScope.user._id) {
                    event.backgroundColor = '#4fbda2';
                    break;
                  }
                }
                $scope.events.push(event);
              }
              // remove any previous events before adding to avoid duplicates
              $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
              $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
            }, function(err, status) {
            });
          }
        }
      });

    	$scope.dayClick = function( date, allDay, jsEvent, view ){
    		if(!$scope.$$phase) {        
          		$scope.$apply(function() {
        				$scope.selectedDay = date;
                $scope.loadingDayEvents = true;
                $scope.dayEvents = [];
                if($scope.currentView == 'school') {
                  eventService.getEventsBySchoolAndDay($rootScope.user._id, $rootScope.user.school._id, $scope.selectedDay).then(function (data, status) {
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
                }
                else if($scope.currentView == 'nearby') {
                  console.log('nearby');
                  eventService.getEventsByLocationAndDay($rootScope.user._id, $rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), $scope.selectedDay).then(function (data, status) {
                    console.log(data);
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
                }
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
              for (var i = 0; i < $scope.events.length; i++) {
                if($scope.events[i].id == eventId) {
                  // highlight event on calendar
                  $scope.events[i].backgroundColor = '#4fbda2';
                  $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
                  $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
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
              for (var i = 0; i < $scope.events.length; i++) {
                if($scope.events[i].id == eventId) {
                  // un-highlight event on calendar
                  $scope.events[i].backgroundColor = '#315273';
                  $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
                  $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
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
              },
              location: null
            }
          });
      };

      $scope.sortOptions = [{
        label: 'by start date',
        value: 'startDate'
      },
      {
        label: 'by post date',
        value: 'timestamp'
      }
    ];

    $scope.changeSort = function(option) {
      $scope.currentSort = option;
    };

    $scope.currentSort = {
      label: 'by start date',
      value: 'startDate'
    };
        
    }]);
});