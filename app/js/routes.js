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
            title: 'Register'
        })
        .state('inner.registerBusiness', {
            url: '/register/business',
            templateUrl: '/partials/register-business.html',
            controller: 'registerStudentCtrl',
            title: 'Business Register'
        })
        .state('inner.registerStudent', {
            url: '/register/student',
            templateUrl: '/partials/register-student.html',
            controller: 'registerBusinessCtrl',
            title: 'Student Register'
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
        .state('inner.explore', {
            url: '/explore',
            templateUrl: '/partials/explore.html',
            controller: 'exploreCtrl',
            title: 'Explore',      
            resolve: {
                resolvedLocation: function(locationService) {
                    return locationService.getGeo().then(function (data) {
                        return data;
                    },
                    function (errorMessage) {
                        return errorMessage;
                    });
                }
            }
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
            resolve: {
                setTitle: function($stateParams, $rootScope){
                    $rootScope.pageTitle = $stateParams.eventId; // TODO: DO HTTP CALL TO GET ACTUAL EVENT NAME
                }
            }
        })
        .state('inner.post', {
            url: '/post',
            templateUrl: '/partials/post.html',
            controller: 'postCtrl',
            title: 'Post An Event',
            resolve: {
                resolvedLocation: function(locationService) {
                    return locationService.getGeo().then(function (data) {
                        return data;
                    },
                    function (errorMessage) {
                        return errorMessage;
                    });
                }
            }
        })
        .state('inner.settings', {
            url: '/settings',
            templateUrl: '/partials/settings.html',
            controller: 'settingsCtrl',
            title: 'Account Settings'
        })
        .state('inner.profile', {
            url: '/profile/:userName',
            templateUrl: '/partials/profile.html',
            controller: 'profileCtrl',
            resolve: {
                setTitle: function($stateParams, $rootScope){
                    $rootScope.pageTitle = $stateParams.userName;
                }
            }
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