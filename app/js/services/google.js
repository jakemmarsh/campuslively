define(['./index', 'https://apis.google.com/js/client.js'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('googleService', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
    var deferred = $q.defer();
    return {
      clientId: '257320210287.apps.googleusercontent.com',
      apiKey: 'AIzaSyDJHaZDPj_r8vjUiFTJjp8w8j31cQtIzgQ',
      scopes: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/plus.login',
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
      handleAuthClick: function(event) {
          gapi.auth.authorize({ 
              client_id: clientId, 
              scope: scopes, 
              immediate: false, 
              hd: domain 
          }, this.handleAuthResult);
          return false;
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
              eventsDeferred = $q.defer();

          var request = gapi.client.calendar.events.list({
            calendarId: calendarId
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
      }
    }
  }]);
});