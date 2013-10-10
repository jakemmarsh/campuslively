define(['./index'], function (controllers) {
    'use strict';
    controllers.controller('activateCtrl', function ($scope, $stateParams, $location, resolvedActivation) {
        // redirect if given reset key isn't legitimate
        if(!$stateParams.activateKey || !$stateParams.userId || !resolvedActivation) {
            $location.path('/login');
        }
    });
});