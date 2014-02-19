define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('userService', ['$q', '$http', function($q, $http) {
  	function checkStatus() {}
    return {
    	apiPath: '/api/v1/user/',
    	getAllUsers: function() {
			var deferred = $q.defer();
			
			$http.get(this.apiPath).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getSubscribers: function(userId) {
			var deferred = $q.defer();

			$http.get(this.apiPath + userId + '/subscribers').success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getUsersForInvite: function(userId, eventId) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + userId + '/inviteTo/event/' + eventId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
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

			$http.post(this.apiPath + userId + '/image', formData, {
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
		},
		getActivitiesNewer: function(userId, newestId) {
			var deferred = $q.defer(),
				newestId = (typeof newestId === "undefined") ? null : newestId;

			if(newestId) {
				$http.get(this.apiPath + userId + '/activities/newer/' + newestId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + userId + '/activities/newer/').success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getActivitiesOlder: function(userId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + userId + '/activities/older/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		addFacebookSubscriptions: function(userId) {
			var deferred = $q.defer();

			$http.post(this.apiPath + userId + '/addFacebookSubscriptions').success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		deleteUser: function(userId) {
			var deferred = $q.defer();

			$http.delete(this.apiPath + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
    }
  }]);
});