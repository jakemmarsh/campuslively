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
		getEventsBySchool: function(schoolId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'school/' + schoolId + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'school/' + schoolId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsBySchoolOlder: function(schoolId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'school/' + schoolId + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocation: function(lat, lng, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'near/' + lat + '/' + lng).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByLocationOlder: function(lat, lng, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsBySchoolAndDay: function(schoolId, date) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'school/' + schoolId + '/day/' + date).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByLocationAndDay: function(lat, lng, date) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'lat/' + lat + '/lng/' + lng + '/day/' + date).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByUser: function(userId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'user/' + userId + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'user/' + userId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByUserOlder: function(userId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'user/' + userId + '/olderThan/' + oldestId + '/limit/' + limit).success(function(data, status) {
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
  });
});