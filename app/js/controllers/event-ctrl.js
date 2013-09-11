define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('eventCtrl', function ($scope, $stateParams) {
    	$scope.eventId = $stateParams.eventId;
    });
});