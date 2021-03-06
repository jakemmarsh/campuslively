define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('schoolService', ['$q', '$http', function($q, $http) {
    return {
      apiPath: '/api/v1/school/',
      getAllSchools: function() {
        var deferred = $q.defer();

        $http.get(this.apiPath + 'all').success(function(data) {
          deferred.resolve(data);
        }).error(function(err, status) {
          deferred.reject(err, status);
        });

        return deferred.promise;
      }
    };
  }]);
});