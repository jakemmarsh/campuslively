define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('eventService', function($q, $http) {
  	function checkStatus() {}
    return {
    	apiPath: '/api/v1/event/',
    	getEvent: function(eventId) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + eventId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsBySchool: function(schoolId) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'school/' + schoolId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocation: function(location) {
			var deferred = $q.defer();

			return deferred.promise;
		},
		postEvent: function(event) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath, event).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		postComment: function(eventId, comment) {
			var deferred = $q.defer();

			$http.post(this.apiPath + eventId + '/comment', comment).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
    }
  });
});