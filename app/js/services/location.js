define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('locationService', function($q, $http, $rootScope) {
    return {
      getGeo: function() {
        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function (pos) {
          $rootScope.$apply(function () {
            deferred.resolve(angular.copy(pos.coords));
          })
        }, function (error) {
          $rootScope.$apply(function () {
            deferred.reject(error);
          })
        })

        return deferred.promise;
      },
      foursquare: function(pos) {
        var deferred = $q.defer(),
            clientSecret = 'R4IVY3OSER10BUFMKODGCWFHXITCTRGXS5UJED1HRCEGQZSS',
            clientID = 'GA3OVFMEIKL1UC3ZXAUPS5ZOIJ3FIQPEWSTGRXOOYHFPC554';

        $http.get('https://api.foursquare.com/v2/venues/search?ll=' + pos.latitude.toFixed(2) + ',' + pos.longitude.toFixed(2) + '&client_id=' + clientID + '&client_secret=' + clientSecret).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject("An error occurred while logging a user in.");
        });

        return deferred.promise;
      },
    }
  });
});