define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('innerCtrl', ['$scope', '$rootScope', 'inviteService', function ($scope, $rootScope, inviteService) {
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
		        },
		        function (errorMessage) {
		        });
		        gotInvites = true;
        	}
        });

		$rootScope.$watch('fbStatus', function() {
			if($rootScope.user && $rootScope.fbStatus && $rootScope.user.facebook.hasLinked == false) {
				if(!$rootScope.user.fbId && $rootScope.fbStatus.status !== 'connected') {
					var fbMessage = { 
						msg: 'You haven\'t linked your account to Facebook yet. '+
							 '<a href="/settings">Try it out in your account settings!</a>',
						type: 'message'
					};
					$scope.notifications.unshift(fbMessage);
				}
				else {
					$scope.notifications.splice(0,1);
				}
			}
		});

		$scope.closeNotification = function(index) {
			if($scope.notifications[index].type == 'invite') {
				inviteService.markAsRead($scope.notifications[index].inviteId).then(function (data) {
	    			$scope.notifications.splice(index, 1);
		        },
		        function (errorMessage) {
		        });
			}
			else {
				$scope.notifications.splice(index, 1);
			}
		};
    }]);
});