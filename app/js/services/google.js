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
          gapi.client.load('calendar', 'v3', function() {
              var request = gapi.client.calendar.calendarList.list({});
              request.execute(function(resp) {
                  if(!resp.error) {
                    var calendarIds = [];
                    for(var i = 0; i < resp.items.length; i++) {
                      calendarIds.push(resp.items[i].id);
                    }
                    getEvents(calendarIds);
                  }
                  else {
                    deferred.reject(resp.error);
                  }
              });
          });
        },
        // get all events for each calendar that was found
        getEvents = function(calendarIds) {
          var events = [];
          
          for(var i = 0; i < calendarIds.length; i++) {
            // bind i to function to allow asynchronous functions inside for loop
            (function(cntr) {
              var request = gapi.client.calendar.events.list({
                calendarId: calendarIds[i]
              });

              request.execute(function(resp) {
                  if(!resp.error) {
                    for(var j = 0; j < resp.items.length; j++) {
                      console.log(j);
                      events.push(resp.items[j]);
                    }
                  }
                  else {
                    deferred.reject(resp.error);
                  }
              });
            })(i);
          }
          deferred.resolve(events);
        };

        // login to google API before making calls
        gapi.auth.authorize({ 
              client_id: this.clientId, 
              scope: this.scopes, 
              immediate: true, 
        }, getCalendars);

        return deferred.promise;
      }
    }
  }]);
});