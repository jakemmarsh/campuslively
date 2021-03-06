define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('authService', ['$q', '$http', function($q, $http) {
    return {
    	apiPath: '/api/v1/auth/',
		isLoggedIn: function() {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + 'check').success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err, status);
			});

			return deferred.promise;
		},
		login: function(user) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'login', user).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		register: function(newUser) {
			var deferred = $q.defer();

			$http.put(this.apiPath + 'register', newUser).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		checkUsername: function(username) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'username/' + username).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		checkEmail: function(email) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'email/' + email).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		activateUser: function(userId, activateKey) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'user/' + userId + '/activate/' + activateKey).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		resendActivation: function(username) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + username + '/resend').success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		forgotPassword: function(username) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'forgot', username).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		checkResetKey: function(resetKey) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'checkKey/' + resetKey).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		resetPassword: function(password) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'reset', password).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		},
		logout: function(user) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'logout', user).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err, status);
			});

			return deferred.promise;
		}
    };
  }]);
});