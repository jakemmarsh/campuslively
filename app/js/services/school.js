define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('schoolService', function($q, $http) {
    return {
      apiPath: '/api/v1/school/',
      getAllSchools: function() {
        var deferred = $q.defer();

        $http.get(this.apiPath + 'all').success(function(data, status) {
          deferred.resolve(data);
        }).error(function(err, status) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    }
  });
});