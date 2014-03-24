define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('locationService', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
    return {
      getGeo: function() {
        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function (pos) {
          $rootScope.$apply(function () {
            deferred.resolve(angular.copy(pos.coords));
          });
        }, function (error) {
          $rootScope.$apply(function () {
            deferred.reject(error);
          });
        });

        return deferred.promise;
      },
      getFoursquareVenues: function(pos) {
        var deferred = $q.defer(),
            clientSecret = 'R4IVY3OSER10BUFMKODGCWFHXITCTRGXS5UJED1HRCEGQZSS',
            clientID = 'GA3OVFMEIKL1UC3ZXAUPS5ZOIJ3FIQPEWSTGRXOOYHFPC554',
            year = (new Date()).getFullYear(),
            month = (new Date()).getMonth() + 1,
            day = ((new Date()).getDate().length > 1) ? (new Date()).getDate() : '0'+String((new Date()).getDate()),
            date = String(year) + String(month) + String(day);

        $http.get('https://api.foursquare.com/v2/venues/search?ll=' + pos.latitude.toFixed(2) + ',' + pos.longitude.toFixed(2) + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=' + date).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject("An error occurred while fetching venues from Foursquare.");
        });

        return deferred.promise;
      },
      checkAddress: function(address) {
        var deferred = $q.defer();

        $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=true').success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject("An error occurred while validating the address given.");
        });

        return deferred.promise;
      }
    };
  }]);
});