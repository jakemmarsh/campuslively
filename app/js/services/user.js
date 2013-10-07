define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('userService', function($q, $http) {
  	function checkStatus() {}
    return {
    	apiPath: '/api/v1/user/',
    	getUserById: function(userId) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getUserByName: function(username) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + 'name/' + username).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		updateUser: function(user) {
			var deferred = $q.defer();

			$http.put(this.apiPath + user._id, user).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		subscribe: function(userId, subscriptionId) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath + userId + '/subscribe/' + subscriptionId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		unsubscribe: function(userId, subscriptionId) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath + userId + '/unsubscribe/' + subscriptionId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
    }
  });
});