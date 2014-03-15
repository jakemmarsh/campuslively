define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('innerCtrl', ['$scope', '$rootScope', 'inviteService', 'userService', function ($scope, $rootScope, inviteService, userService) {
    	var gotInvites = false;
        $scope.notifications = [];

        $rootScope.$watch('user', function() {
        	if($rootScope.user && !gotInvites) {
        		inviteService.getUnreadInvites($rootScope.user._id).then(function (data) {
	    			for(var i = 0; i < data.length; i++) {
	    				var notification = {
	    					type: 'invite',
	    					msg: '<a href="/profile/'+data[i].sender.username+'">'+data[i].sender.displayName+'</a> '+
	    						 'invited you to <a href="/event/'+data[i].event._id+'">'+data[i].event.title+'</a>.',
	    					inviteId: data[i]._id
	    				};

	    				$scope.notifications.push(notification);
	    			}
	    			gotInvites = true;
		        },
		        function (errorMessage) {
		        	gotInvites = true;
		        });
        	}
        });

		$rootScope.$watch('fbStatus', function() {
			var daysSinceReminder = 8;
			
			// only show facebook reminder if they haven't been reminded for at least a week
			if($rootScope.user && $rootScope.user.facebook.lastReminded) {
				var oneDay = 1000*60*60*24,
					today = new Date().getTime(),
					lastReminded = new Date($rootScope.user.facebook.lastReminded).getTime();
				
				daysSinceReminder = Math.round((today - lastReminded)/oneDay);
			}

			if($rootScope.user && $rootScope.fbStatus && $rootScope.user.facebook.hasLinked === false && daysSinceReminder >= 7 && !$rootScope.user.fbId && $rootScope.fbStatus.status !== 'connected') {
				var updateParams = {};
				updateParams.facebook = {
					id: null,
					subscriptions: null,
					managedPages: null,
					autoPost: null,
					lastReminded: new Date()
				};

				userService.updateUser($rootScope.user._id, updateParams).then(function (data, status) {
                	var fbMessage = { 
						msg: 'You haven\'t linked your account to Facebook yet. '+
							 '<a href="/settings">Try it out in your account settings!</a>',
						type: 'message'
					};
					$scope.notifications.unshift(fbMessage);
				});
			}
		});

		$scope.closeNotification = function(index) {
			if($scope.notifications[index].type === 'invite') {
				inviteService.markAsRead($scope.notifications[index].inviteId).then(function (data) {
	    			$scope.notifications.splice(index, 1);
		        },
		        function (errorMessage) {
		        	$scope.notifications.splice(index, 1);
		        });
			}
			else {
				$scope.notifications.splice(index, 1);
			}
		};
    }]);
});