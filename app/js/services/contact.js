define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('contactService', ['$q', '$http', function($q, $http) {
    return {
    	apiPath: '/api/v1/contact',
		sendMessage: function(message) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath, message).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err, status);
			});

			return deferred.promise;
		}
    };
  }]);
});