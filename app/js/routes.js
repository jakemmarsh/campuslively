/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
            
        $urlRouterProvider.otherwise("/") 

        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/partials/home.html',
            title: 'Home'
        });
    });
});