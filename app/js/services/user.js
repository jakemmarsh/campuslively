define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('userService', function($q, $http) {
  	function checkStatus() {}
    return {
    	apiPath: '/api/v1/user/',
		getUserByName: function(username) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + 'name/' + username).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err);
			});

			return deferred.promise;
		},
		subscribe: function(userId, subscriptionId) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath + userId + '/subscribe/' + subscriptionId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err);
			});

			return deferred.promise;
		},
		unsubscribe: function(userId, subscriptionId) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath + userId + '/unsubscribe/' + subscriptionId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err);
			});

			return deferred.promise;
		}
    }
  });
});