define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('settingsCtrl', function ($scope, $modal) {
    	$scope.changesSaved = false;

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
		}

		$scope.saveChanges = function() {
			var formData = new FormData();
			formData.append('image', $scope.newUserImage.resized, $scope.newUserImage.resized.name);

			$scope.changesSaved = true;
		}

		$scope.removeSubscription = function(subscriptionId) {
			console.log('unsubscribe');
		}
    });
});