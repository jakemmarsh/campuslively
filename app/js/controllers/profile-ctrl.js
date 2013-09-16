define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams) {
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