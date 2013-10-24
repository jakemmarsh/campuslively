define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('resendCtrl', ['$scope', '$stateParams', '$location', 'resolvedEmailSent', function ($scope, $stateParams, $location, resolvedEmailSent) {
        // redirect if given reset key isn't legitimate
        if(!$stateParams.activateKey || !$stateParams.userId || !resolvedEmailSent) {
            $location.path('/login');
        }
    }]);
});