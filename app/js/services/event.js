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
		getEventsBySchoolNewer: function(schoolId, newestId) {
			var deferred = $q.defer(),
				newestId = (typeof newestId === "undefined") ? null : newestId;

			if(newestId) {
				$http.get(this.apiPath + 'school/' + schoolId + '/newer/' + newestId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'school/' + schoolId + '/newer').success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsBySchoolOlder: function(schoolId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'school/' + schoolId + '/older/' + oldestId + '/limit/' + limit).success(function(data, status) {
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
		getEventsByLocationNewer: function(lat, lng, newestId) {
			var deferred = $q.defer(),
				newestId = (typeof newestId === "undefined") ? null : newestId;

			if(newestId) {
				$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/newer/' + newestId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/newer').success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByLocationOlder: function(lat, lng, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/older/' + oldestId + '/limit/' + limit).success(function(data, status) {
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

			$http.get(this.apiPath + 'near/' + lat + '/' + lng + '/day/' + date).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		getEventsByUser: function(profileId, limit) {
			var deferred = $q.defer(),
				limit = (typeof limit === "undefined") ? null : limit;

			if(limit) {
				$http.get(this.apiPath + 'profile/' + profileId + '/limit/' + limit).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'profile/' + profileId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByUserNewer: function(profileId, newestId) {
			var deferred = $q.defer(),
				newestId = (typeof newestId === "undefined") ? null : newestId;

			if(newestId) {
				$http.get(this.apiPath + 'profile/' + profileId + '/newer/' + newestId).success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}
			else {
				$http.get(this.apiPath + 'profile/' + profileId + '/newer').success(function(data, status) {
					deferred.resolve(data);
				}).error(function(err, status) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},
		getEventsByUserOlder: function(profileId, oldestId, limit) {
			var deferred = $q.defer();

			$http.get(this.apiPath + 'profile/' + profileId + '/older/' + oldestId + '/limit/' + limit).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		postEvent: function(event) {
			var deferred = $q.defer();
			
			$http.put(this.apiPath, event).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		createFacebookObject: function(event) {
			var deferred = $q.defer(),
				accessToken = '458852510898409|6dr7y1LgXO06y2iTfvl6Q9KB38M',
				object = {
					title: event.title,
					url: 'http://www.campuslively.com/event/' + event._id
				},
				privacy = {
					'value': 'SELF'
				};

			if(event.description) {
				object.description = event.description;
			}

			if(event.pictureUrl) {
				object.image = event.pictureUrl;
			}
			else {
				object.image = 'http://campuslively.s3.amazonaws.com/assets/img/fb_logo.png';
			}

			object = JSON.stringify(object);

			$http.post('https://graph.facebook.com/app/objects/campuslively:event?access_token=' + accessToken + '&privacy=' + privacy + '&object=' + object).success(function(data, status) {
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

			$http.delete(this.apiPath + eventId + '/unrsvp/' + userId).success(function(data, status) {
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

			$http.delete(this.apiPath + 'comment/' + commentId + '/unlike/' + userId).success(function(data, status) {
				deferred.resolve(data);
			}).error(function(err, status) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		inviteUsers: function(eventId, senderId, recipientIds) {
			var deferred = $q.defer();

			$http.post(this.apiPath + eventId + '/invite/sender/' + senderId, recipientIds).success(function(data, status) {
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