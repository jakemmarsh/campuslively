define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('innerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.alerts = [];

		$scope.$watch('fbStatus', function() {
			if($rootScope.user && $rootScope.fbStatus) {
				if(!$rootScope.user.fbId && $rootScope.fbStatus.status !== 'connected') {
					var fbMessage = { msg: 'You haven\'t linked your account to Facebook yet. '+
										   '<a data-ng-href="/settings" href="/settings">Try it out in your account settings!</a>' };
					$scope.alerts.unshift(fbMessage);
				}
				else {
					$scope.alerts.splice(0,1);
				}
			}
		});

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
    }]);
});