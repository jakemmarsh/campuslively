define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('resetCtrl', ['$scope', '$stateParams', 'authService', function ($scope, $stateParams, authService) {
        $scope.changePassword = function() {
            var dataToSend = {
                userId: $stateParams.userId,
                resetKey: $stateParams.resetKey,
                password: $scope.password
            };

            authService.resetPassword(dataToSend).then(function() {
                $scope.resetError = null;
                $scope.passwordChanged = true;
            },
            function (errorMessage) {
                $scope.resetError = errorMessage;
            });
        };
    }]);
});