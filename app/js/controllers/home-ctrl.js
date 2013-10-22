define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('homeCtrl', function ($scope) {
    	$scope.currentView = 'student';
    	
		$scope.viewOptions = [{
				label: 'Student',
				value: 'student'
			},
			{
				label: 'Club/Group',
				value: 'business'
			}
		];
    });
});