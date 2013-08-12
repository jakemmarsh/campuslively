/**
 * Defines the main routes in the application.
 */
define(['./app', './config'], function (app) {
    'use strict';
    app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
            
        $urlRouterProvider.otherwise("/") 

        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/partials/home.html',
            title: 'Home'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            title: 'Login'
        });
    });
});