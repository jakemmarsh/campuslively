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
			
			$http.get(this.apiPath + 'username/' + username).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		updateUser: function(userId, updatedParams) {
			var deferred = $q.defer();

			$http({method: 'PATCH', url: this.apiPath + userId, data: updatedParams}).success(function(data, status) {
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
		},
		uploadImage: function(image, userId) {
			var deferred = $q.defer(),
				formData = new FormData();
			
			formData.append('image', image, image.name);

			$http.post('/api/v1/user/' + userId + '/image', formData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getActivities: function(userId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + userId + '/activities/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + userId + '/activities').success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		}
    }
  });
});