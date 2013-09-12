define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('profileCtrl', function ($scope, $stateParams) {
    	$scope.userName = $stateParams.userName;
    });
});