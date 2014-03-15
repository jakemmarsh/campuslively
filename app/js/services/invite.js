define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('inviteService', ['$q', '$http', function($q, $http) {
    return {
    	apiPath: '/api/v1/invite/',
		getUnreadInvites: function(userId) {
			var deferred = $q.defer();
			
			$http.get(this.apiPath + 'user/' + userId).success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err, status);
			});

			return deferred.promise;
		},
		markAsRead: function(inviteId) {
			var deferred = $q.defer();
			
			$http.post(this.apiPath + inviteId + '/read').success(function(data) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.resolve(err, status);
			});

			return deferred.promise;
		}
    };
  }]);
});