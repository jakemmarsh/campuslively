define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('userService', function($q, $http) {
  	function checkStatus() {}
    return {
    	apiPath: '/api/v1/auth/',
		isLoggedIn: function() {
			$http.get(this.apiPath + 'check').success(function(data, status) {
				return true;
			}).error(function(err, status) {
				return false;
			});
		},
		login: function(user) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'login', user).success(function(data, status) {
				deferred.resolve(data, status);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		register: function(newUser) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'register', newUser).success(function(data, status) {
				deferred.resolve(data, status);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		}
    }
  });
});