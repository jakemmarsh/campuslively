define(['./index', 'https://apis.google.com/js/client.js'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('googleService', ['$q', '$http', function($q, $http) {
    var deferred = $q.defer();
    return {
      clientId: '257320210287.apps.googleusercontent.com',
      apiKey: 'AIzaSyDJHaZDPj_r8vjUiFTJjp8w8j31cQtIzgQ',
      scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/plus.login',
      login: function () {
          gapi.auth.authorize({
              client_id: this.clientId,
              scope: this.scopes,
              immediate: false,
          }, this.handleAuthResult);

          return deferred.promise;
      },
      handleAuthResult: function(authResult) {
          if (authResult && !authResult.error) {
              var data = {};
              gapi.client.load('oauth2', 'v2', function () {
                  var request = gapi.client.oauth2.userinfo.get();
                  request.execute(function (resp) {
                      data.id = resp.id;

                      deferred.resolve(data);
                  });
              });
          } else {
              deferred.reject();
          }
      },
      handleAuthClick: function() {
          gapi.auth.authorize({
              client_id: this.clientId,
              scope: this.scopes,
              immediate: false,
          }, this.handleAuthResult);
          return false;
      },
      getUserCalendar: function() {
        var deferred = $q.defer(),
            getCalendars = function() {
              gapi.client.load('calendar', 'v3', function() {
                  var request = gapi.client.calendar.calendarList.list({});
                  request.execute(function(resp) {
                      if(!resp.error) {
                        for(var i = 0; i < resp.items.length; i++) {
                          // get the first calendar that isn't a Google default calendar
                          if(resp.items[i].id.indexOf("calendar.google.com") === -1) {
                            deferred.resolve(resp.items[i].id);
                            break;
                          }
                        }
                      }
                      else {
                        deferred.reject(resp.error);
                      }
                  });
              });
            };

        // login to google API before making calls
        gapi.auth.authorize({
              client_id: this.clientId,
              scope: this.scopes,
              immediate: true,
        }, getCalendars);

        return deferred.promise;
      },
      getAllEvents: function() {
        var deferred = $q.defer(),

        // get all calendars that the user has on Google Calendar
        getCalendars = function() {
          var calDeferred = $q.defer();

          gapi.client.load('calendar', 'v3', function() {
              var request = gapi.client.calendar.calendarList.list({});
              request.execute(function(resp) {
                  if(!resp.error) {
                    var calendarIds = [];
                    for(var i = 0; i < resp.items.length; i++) {
                      calendarIds.push(resp.items[i].id);
                    }
                    calDeferred.resolve(calendarIds);
                  }
                  else {
                    calDeferred.reject(resp.error);
                  }
              });
          });

          return calDeferred.promise;
        },
        // get all events for a calendar
        getEvents = function(calendarId) {
          var events = [],
              eventsDeferred = $q.defer(),
              today = new Date();

          today.setHours(0,0,0,0);

          var request = gapi.client.calendar.events.list({
            calendarId: calendarId,
            timeMin: today.toISOString()
          });

          request.execute(function(resp) {
              if(!resp.error) {
                for(var j = 0; j < resp.items.length; j++) {
                  events.push(resp.items[j]);
                }
                eventsDeferred.resolve(events);
              }
              else {
                eventsDeferred.reject(resp.error);
              }
          });

          return eventsDeferred.promise;
        },
        getAllEvents = function() {
          getCalendars().then(function (calendarIds) {
            var eventCalls = [];

            // get promise for each calendar event query
            for(var i = 0; i < calendarIds.length; i++) {
              eventCalls.push(getEvents(calendarIds[i]));
            }

            // make all calls to get all events
            $q.all(eventCalls).then(function(results) {
              var aggregatedData = [];

              angular.forEach(results, function (result) {
                  aggregatedData = aggregatedData.concat(result);
              });

              deferred.resolve(aggregatedData);
            });
          },
          function (errorMessage) {
            deferred.reject(errorMessage);
          });
        };

        // login to google API before making calls
        gapi.auth.authorize({
              client_id: this.clientId,
              scope: this.scopes,
              immediate: true,
        }, getAllEvents);

        return deferred.promise;
      },
      addEvent: function(calendarId, event) {
        var deferred = $q.defer(),
            insertEvent = function(calendarId, event) {
              var resource = {
                "summary": event.title,
                "location": event.locationName,
                "description": event.description,
                "source": {
                  "title": "Campuslively",
                  "url": "http://www.campuslively.com/event/" + event._id
                },
                "start": {
                  "dateTime": new Date(event.startDate)  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
                }
              };

              // if the event has an end time, use that
              if(event.endTime) {
                var timeArray = event.endTime.split(':'),
                  hours = parseInt(timeArray[0]),
                  minutes = parseInt(timeArray[1].replace(/\D/g,''));

                // adjust 24-hour format for am/pm
                if(timeArray[1].toLowerCase().indexOf('pm') !== -1) {
                  hours += 12;
                }

                var newEndDate = new Date(event.startDate);
                newEndDate.setHours(hours);
                newEndDate.setMinutes(minutes);
              }
              // otherwise, create an arbitrary end time of 2 hours later
              else {
                newEndDate = new Date(event.startDate);
                newEndDate.setHours(newEndDate.getHours() + 2);
              }
              resource["end"] = {
                "dateTime": newEndDate //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
              }

              gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.insert({
                  'calendarId': calendarId,
                  'resource': resource
                });
                request.execute(function(resp) {
                  if (resp.id){
                    deferred.resolve(resp);
                  }
                  else {
                    deferred.reject();
                  }
                });
              });
            };

        // login to google API before making calls
        gapi.auth.authorize({
              client_id: this.clientId,
              scope: this.scopes,
              immediate: true,
        }, insertEvent(calendarId, event));

        return deferred.promise;
      },
      removeEvent: function(calendarId, eventId) {
        var deferred = $q.defer(),
            deleteEvent = function(calendarId, eventId) {
              gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.delete({
                  'calendarId': calendarId,
                  'eventId': eventId
                });

                request.execute(function(resp) {
                  if (typeof resp === 'undefined') {
                    deferred.resolve();
                  }
                  else {
                    deferred.reject();
                  }
                });
              });
            };

          // login to google API before making calls
          gapi.auth.authorize({
                client_id: this.clientId,
                scope: this.scopes,
                immediate: true,
          }, deleteEvent(calendarId, eventId));

          return deferred.promise;
      }
    }
  }]);
});