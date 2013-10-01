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
      getFoursquareVenues: function(pos) {
        var deferred = $q.defer(),
            clientSecret = 'R4IVY3OSER10BUFMKODGCWFHXITCTRGXS5UJED1HRCEGQZSS',
            clientID = 'GA3OVFMEIKL1UC3ZXAUPS5ZOIJ3FIQPEWSTGRXOOYHFPC554';

        $http.get('https://api.foursquare.com/v2/venues/search?ll=' + pos.latitude.toFixed(2) + ',' + pos.longitude.toFixed(2) + '&radius=10000&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130929').success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject("An error occurred while fetching venues from Foursquare.");
        });

        return deferred.promise;
      },
      createFoursquareVenue: function(venue) {
        var deferred = $q.defer(),
            clientSecret = 'R4IVY3OSER10BUFMKODGCWFHXITCTRGXS5UJED1HRCEGQZSS',
            clientID = 'GA3OVFMEIKL1UC3ZXAUPS5ZOIJ3FIQPEWSTGRXOOYHFPC554';

        $http.post('https://api.foursquare.com/v2/venues/add?client_id=' + clientID + '&client_secret=' + clientSecret, venue).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject("An error occurred while sending venue to Foursquare.");
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
    }
  });
});