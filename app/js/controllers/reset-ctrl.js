define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('resetCtrl', function ($scope, $stateParams, $location) {
        // redirect if given reset key isn't legitimate
        if(!$stateParams.resetKey) {
            $location.path('/login');
        }

        $scope.changePassword = function() {
            console.log('change password');
        };
    });
});