define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('contactService', function($q, $http) {
    return {
    	apiPath: '/api/v1/contact',
		sendMessage: function(message) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath, message).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err);
			});

			return deferred.promise;
		}
    }
  });
});