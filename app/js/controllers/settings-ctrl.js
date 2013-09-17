define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('settingsCtrl', function ($scope, $modal) {
    	$scope.open = function (modal) {
		  	if (modal.toLowerCase() == 'twitter') {
			    var modalInstance = $modal.open({
			      templateUrl: 'twitterModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
			else if (modal.toLowerCase() == 'facebook') {
				var modalInstance = $modal.open({
			      templateUrl: 'facebookModal.html',
			      controller: 'modalInstanceCtrl'
			    });
			}
		};
    });
});