define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventsCtrl', function ($scope) {
    	$scope.viewOptions = [{
				label : 'My School',
				value : 'school'
			},
			{
				label : 'Nearby',
				value : 'nearby'
			}
		];
    	
    });
});