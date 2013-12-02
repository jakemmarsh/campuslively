define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('homeCtrl', ['$scope', function ($scope) {
    	$scope.currentView = 'student';
    	
		$scope.viewOptions = [{
				label: 'Student',
				value: 'student'
			},
			{
				label: 'Club/Group',
				value: 'group'
			}
		];

		$scope.currentYear = new Date().getFullYear();
    }]);
});