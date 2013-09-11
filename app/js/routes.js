/**
 * Defines the main routes in the application.
 */
define(['./app'], function (app) {
    'use strict';
    app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);          

        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/partials/home.html',
            title: 'Home'
        })
        .state('inner', {
            templateUrl: '/partials/inner.html',
        })
        .state('inner.login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            controller: 'loginCtrl',
            title: 'Login'
        })
        .state('inner.register', {
            url: '/register',
            templateUrl: '/partials/register.html',
            controller: 'registerCtrl',
            title: 'Register'
        })
        .state('inner.forgot', {
            url: '/forgot',
            templateUrl: '/partials/forgot.html',
            controller: 'forgotCtrl',
            title: 'Forgotten Password'
        })
        .state('inner.feed', {
            url: '/feed',
            templateUrl: '/partials/feed.html',
            controller: 'feedCtrl',
            title: 'My Feed'
        })
        .state('inner.events', {
            url: '/events',
            templateUrl: '/partials/events.html',
            controller: 'eventsCtrl',
            title: 'Events'
        })
        .state('inner.calendar', {
            url: '/calendar',
            templateUrl: '/partials/calendar.html',
            controller: 'calendarCtrl',
            title: 'Events Calendar'
        })
        .state('inner.event', {
            url: '/event/:eventId',
            templateUrl: '/partials/event.html',
            controller: 'eventCtrl',
            title: 'Event' // TODO: GET ACTUAL NAME OF CURRENT EVENT
        })
        .state('inner.settings', {
            url: '/settings',
            templateUrl: '/partials/settings.html',
            controller: 'settingsCtrl',
            title: 'Account Settings'
        })
        .state('inner.profile', {
            url: '/profile/:userId',
            templateUrl: '/partials/profile.html',
            controller: 'profileCtrl',
            title: 'Profile' // TODO: GET ACTUAL NAME OF CURRENT PROFILE
        })
        .state('inner.contact', {
            url: '/contact',
            templateUrl: '/partials/contact.html',
            controller: 'contactCtrl',
            title: 'Contact Us'
        })
        .state('inner.privacy', {
            url: '/privacy',
            templateUrl: '/partials/privacy.html',
            title: 'Privacy Policy'
        });

        $urlRouterProvider.otherwise("/");
    });
});