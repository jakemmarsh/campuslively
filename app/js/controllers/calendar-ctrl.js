define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('calendarCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$modal', 'eventService', 'locationService', 'googleService', '$FB', function ($scope, $rootScope, $location, $anchorScroll, $modal, eventService, locationService, googleService, $FB) {
    	var getGoogleCalEvents = function() {
        googleService.getAllEvents().then(function(data) {
          for(var i = 0; i < data.length; i++) {
            if(data[i].start) {
              var event = {
                title: data[i].summary,
                start: data[i].start.dateTime == null ? data[i].start.date : data[i].start.dateTime,
                editable: false,
                backgroundColor: '#dd4b39'
              };
              $scope.events.push(event);
            }
          }
          // remove any previous events before adding to avoid duplicates
          $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
          $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
          $scope.loading = false;
        }, function(err) {
          $scope.loading = false;
        });
      },
      getSchoolEvents = function() {
        eventService.getEventsBySchool($rootScope.user.school._id).then(function (data, status) {
          for(var i = 0; i < data.length; i++) {
            var event = {
              title: data[i].title,
              start: new Date(data[i].startDate),
              editable: false,
              id: data[i]._id
            };
            
            // highlight events that user has RSVP'd to
            event.backgroundColor = $scope.isAttending(data[i]) ? '#4fbda2' : $rootScope.schoolColor;
            
            $scope.events.push(event);
          }

          // get user's events from Google Calendar if they've logged in
          if($rootScope.user.google.id) {
            getGoogleCalEvents();
          }
          else {
            // remove any previous events before adding to avoid duplicates
            $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
            $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
            $scope.loading = false;
          }
        }, function(err, status) {
          $scope.loading = false;
        });
      },
      getNearbyEvents = function() {
        eventService.getEventsByLocation($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2)).then(function (data, status) {
          for(var i = 0; i < data.length; i++) {
            var event = {
              title: data[i].title,
              start: data[i].startDate,
              editable: false,
              id: data[i]._id
            };
            
            // highlight events that user has RSVP'd to
            event.backgroundColor = $scope.isAttending(data[i]) ? '#4fbda2' : $rootScope.schoolColor;

            $scope.events.push(event);
          }
          
          // get user's events from Google Calendar if they've logged in
          if($rootScope.user.google.id) {
            getGoogleCalEvents();
          }
          else {
            // remove any previous events before adding to avoid duplicates
            $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
            $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
            $scope.loading = false;
          }
        }, function(err, status) {
          $scope.loading = false;
        });
      };

      $scope.showDay = false;

      $scope.currentView = 'school';
      
      $scope.viewOptions = [
        {
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
        $scope.loading = true;
        // remove any previous events before adding to avoid duplicates
        $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
        $scope.events = [];

        $scope.showDay = false;
        if($scope.currentView === 'school') {
          getSchoolEvents();
        }
        else if($scope.currentView === 'nearby') {
          if(!$rootScope.userPosition) {
            $scope.gettingPosition = true;

            locationService.getGeo().then(function (data) {
              $rootScope.userPosition = data;
              $scope.gettingPosition = false;
              
              getNearbyEvents();
            },
            function (errorMessage) {
            });
          }
          else {
            getNearbyEvents();
          }
        }
      });

    	$scope.dayClick = function( date, allDay, jsEvent, view ){
    		if(!$scope.$$phase) {        
          		$scope.$apply(function() {
        				$scope.selectedDay = date;
                $scope.loadingDayEvents = true;
                $scope.dayEvents = [];
                if($scope.currentView === 'school') {
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
                  });
                }
                else if($scope.currentView === 'nearby') {
                  eventService.getEventsByLocationAndDay($rootScope.userPosition.latitude.toFixed(2), $rootScope.userPosition.longitude.toFixed(2), $scope.selectedDay).then(function (data, status) {
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

    	$scope.rsvpToEvent = function(event) {
          eventService.rsvp(event._id, $rootScope.user._id).then(function (data) {
              for (var i = 0; i < $scope.dayEvents.length; i++) {
                  if($scope.dayEvents[i]._id === event._id) {
                      $scope.dayEvents[i] = data;
                      break;
                  }
              }
              for (var i = 0; i < $scope.events.length; i++) {
                if($scope.events[i].id === event._id) {
                  // highlight event on calendar
                  $scope.events[i].backgroundColor = '#4fbda2';
                  $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
                  $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
                  break;
                }
              }

              // automatically post to Facebook if user is linked and has option enabled
              if($rootScope.user.facebook.id && $rootScope.user.facebook.autoPost && event.facebookId && event.privacy === 'public') {
                $FB.api(
                  '/me/campuslively:rsvp_to',
                  'post',
                  { event: event.facebookId },
                  function(response) {
                  }
                );
              }
          },
          function (errorMessage) {
          });
      };

      $scope.unRsvpToEvent = function(event) {
          eventService.unRsvp(event._id, $rootScope.user._id).then(function (data) {
              for (var i = 0; i < $scope.dayEvents.length; i++) {
                  if($scope.dayEvents[i]._id === event._id) {
                      $scope.dayEvents[i] = data;
                      break;
                  }
              }
              for (var i = 0; i < $scope.events.length; i++) {
                if($scope.events[i].id === event._id) {
                  // un-highlight event on calendar
                  $scope.events[i].backgroundColor = $rootScope.schoolColor;
                  $scope.eventCalendar.fullCalendar('removeEventSource', $scope.events);
                  $scope.eventCalendar.fullCalendar('addEventSource', $scope.events);
                  break;
                }
              }
          },
          function (errorMessage) {
          });
      };

      $scope.isAttending = function(event) {
          for(var i = 0; i < event.attending.length; i++) {
              if(event.attending[i]._id === $rootScope.user._id) {
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
              location: null,
              event: null
            }
          });
      };

      $scope.sortOptions = [{
        label: 'by start date',
        value: 'startDate'
      },
      {
        label: 'by post date',
        value: '-timestamp'
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