define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams) {
    	$scope.currentView = 'upcoming';
    	
    	if($stateParams.userName == 'jakemmarsh') {
    		$scope.userName = "Jake Marsh";
    	}
    	else {
    		$scope.userName = $stateParams.userName;
    	}

    	$scope.viewOptions = [{
				label : 'Upcoming',
				value : 'upcoming'
			},
			{
				label : 'Newest',
				value : 'newest'
			}
		];
    });
});