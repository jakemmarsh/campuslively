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
			var deferred = $q.defer();

			$http.get('/api/v1/auth/signS3/' + userId).success(function(data, status) {
				var formData = new FormData();
				formData.append('key', userId);
				formData.append('AWSAccessKeyId', data.awsKey);
				formData.append('acl', 'public-read');
				formData.append('policy', data.policy);
				formData.append('signature', data.signature);
				formData.append('Content-Type', image.type);
				formData.append('file', image);

				$http.post('http://' + data.bucket + '.s3.amazonaws.com/', formData).success(function(data) {
					deferred.resolve(data);
				}).error(function(err) {
					deferred.reject(err);
				});
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
    }
  });
});