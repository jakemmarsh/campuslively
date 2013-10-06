define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('resetCtrl', function ($scope, $stateParams, $location, userService) {
        // redirect if given reset key isn't legitimate
        if(!$stateParams.resetKey) {
            $location.path('/login');
        }

        $scope.changePassword = function() {
            var dataToSend = {
                resetKey: $stateParams.resetKey,
                password: $scope.password
            };

            userService.resetPassword(dataToSend).then(function (data, status) {
                $scope.resetError = null;
                $scope.passwordChanged = true;
            },
            function (errorMessage, status) {
                $scope.resetError = errorMessage;
            });
        };
    });
});