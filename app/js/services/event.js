define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('eventService', ['$q', '$http', function($q, $http) {
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
		getEventsBySchool: function(userId, schoolId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'user/' + userId + '/school/' + schoolId + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'user/' + userId + '/school/' + schoolId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsBySchoolNewer: function(userId, schoolId, newestId) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/school/' + schoolId + '/newerThan/' + newestId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsBySchoolOlder: function(userId, schoolId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/school/' + schoolId + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocation: function(userId, lat, lng, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'user/' + userId + '/near/' + lat + '/' + lng + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'user/' + userId + '/near/' + lat + '/' + lng).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByLocationNewer: function(userId, lat, lng, newestId) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + 'near/' + lat + '/' + lng + '/newerThan/' + newestId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocationOlder: function(userId, lat, lng, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/near/' + lat + '/' + lng + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsBySchoolAndDay: function(userId, schoolId, date) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/school/' + schoolId + '/day/' + date).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocationAndDay: function(userId, lat, lng, date) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/lat/' + lat + '/lng/' + lng + '/day/' + date).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByUser: function(userId, profileId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'user/' + userId + '/profile/' + profileId + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'user/' + userId + '/profile/' + profileId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByUserOlder: function(userId, profileId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/profile' + profileId + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

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
		updateEvent: function(eventId, updatedParams) {
			var deferred = $q.defer();

			$http({method: 'PATCH', url: this.apiPath + eventId, data: updatedParams}).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		uploadImage: function(image, eventId) {
			var deferred = $q.defer(),
				formData = new FormData();
			
			formData.append('image', image, image.name);

			$http.post(this.apiPath + eventId + '/image', formData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}).success(function(data, status) {
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
		},
		postSubComment: function(eventId, commentId, subComment) {
			var deferred = $q.defer();

			$http.post(this.apiPath + eventId + '/comment/' + commentId + '/subComment', subComment).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		deleteComment: function(eventId, commentId) {
			var deferred = $q.defer();

			$http.delete(this.apiPath + eventId + '/comment/' + commentId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		deleteSubComment: function(eventId, commentId, subCommentId) {
			var deferred = $q.defer();

			$http.delete(this.apiPath + eventId + '/comment/' + commentId + '/subComment/' + subCommentId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		rsvp: function(eventId, userId) {
			var deferred = $q.defer();

			$http.post(this.apiPath + eventId + '/rsvp/' + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		unRsvp: function(eventId, userId) {
			var deferred = $q.defer();

			$http.post(this.apiPath + eventId + '/unrsvp/' + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		likeComment: function(commentId, userId) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'comment/' + commentId + '/like/' + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		unlikeComment: function(commentId, userId) {
			var deferred = $q.defer();

			$http.post(this.apiPath + 'comment/' + commentId + '/unlike/' + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		deleteEvent: function(eventId) {
			var deferred = $q.defer();

			$http.delete(this.apiPath + eventId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
    }
  }]);
});