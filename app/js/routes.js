/**
 * Defines the main routes in the application.
 */
define(['./app'], function (app) {
    'use strict';
    app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);          

        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/partials/home.html',
            controller: 'homeCtrl',
            title: 'Home',
            access: 'notLoggedIn'
        })
        .state('inner', {
            templateUrl: '/partials/inner.html',
        })
        .state('inner.login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            controller: 'loginCtrl',
            title: 'Login',
            access: 'notLoggedIn'
        })
        .state('inner.register', {
            url: '/register',
            templateUrl: '/partials/register.html',
            title: 'Register',
            access: 'notLoggedIn'
        })
        .state('inner.registerBusiness', {
            url: '/register/business',
            templateUrl: '/partials/register-business.html',
            controller: 'registerBusinessCtrl',
            title: 'Register',
            access: 'notLoggedIn'
        })
        .state('inner.registerStudent', {
            url: '/register/student',
            templateUrl: '/partials/register-student.html',
            controller: 'registerStudentCtrl',
            title: 'Register',
            access: 'notLoggedIn'
        })
        .state('inner.activate', {
            url: '/activate/:userId/:activateKey',
            templateUrl: '/partials/activate.html',
            controller: 'activateCtrl',
            title: 'Activate Account',
            access: 'notLoggedIn',
            resolve: {
                resolvedActivation: function($stateParams, $rootScope, $location, authService){
                    return authService.activateUser($stateParams.userId, $stateParams.activateKey).then(function (data, status) {
                        return true;
                    },
                    function (errorMessage, status) {
                        $location.path('/');
                    });
                }
            }
        })
        .state('inner.resend', {
            url: '/resend/:username',
            templateUrl: '/partials/resend.html',
            controller: 'resendCtrl',
            title: 'Activation Link Resent',
            access: 'notLoggedIn',
            resolve: {
                resolvedEmailSent: function($stateParams, $rootScope, $location, authService){
                    return authService.resendActivation($stateParams.username).then(function (data, status) {
                        return true;
                    },
                    function (errorMessage, status) {
                        $location.path('/');
                    });
                }
            }
        })
        .state('inner.forgot', {
            url: '/forgot',
            templateUrl: '/partials/forgot.html',
            controller: 'forgotCtrl',
            title: 'Forgotten Password',
            access: 'notLoggedIn'
        })
        .state('inner.reset', {
            url: '/reset/:userId/:resetKey',
            templateUrl: '/partials/reset.html',
            controller: 'resetCtrl',
            title: 'Reset Password',
            access: 'notLoggedIn'
        })
        .state('inner.feed', {
            url: '/feed',
            templateUrl: '/partials/feed.html',
            controller: 'feedCtrl',
            title: 'My Feed',
            access: 'loggedIn'
        })
        .state('inner.explore', {
            url: '/explore',
            templateUrl: '/partials/explore.html',
            controller: 'exploreCtrl',
            title: 'Explore',
            access: 'loggedIn'
        })
        .state('inner.calendar', {
            url: '/calendar',
            templateUrl: '/partials/calendar.html',
            controller: 'calendarCtrl',
            title: 'Events Calendar',
            access: 'loggedIn'
        })
        .state('inner.event', {
            url: '/event/:eventId',
            templateUrl: '/partials/event.html',
            controller: 'eventCtrl',
            resolve: {
                resolvedEvent: function($stateParams, $rootScope, eventService, $location){
                    return eventService.getEvent($stateParams.eventId).then(function (data, status) {
                        $rootScope.pageTitle = data.title;
                        return data;
                    },
                    function (errorMessage, status) {
                        $location.path('/feed');
                    });
                }
            },
            access: 'loggedIn'
        })
        .state('inner.post', {
            url: '/post',
            templateUrl: '/partials/post.html',
            controller: 'postCtrl',
            title: 'Post An Event',
            access: 'loggedIn'
        })
        .state('inner.settings', {
            url: '/settings',
            templateUrl: '/partials/settings.html',
            controller: 'settingsCtrl',
            title: 'Account Settings',
            access: 'loggedIn'
        })
        .state('inner.profile', {
            url: '/profile/:username',
            templateUrl: '/partials/profile.html',
            controller: 'profileCtrl',
            resolve: {
                resolvedUser: function($stateParams, $rootScope, userService, $location){
                    return userService.getUserByName($stateParams.username).then(function (data, status) {
                        if(data.type == 'student') {
                            $rootScope.pageTitle = data.firstName + ' ' + data.lastName;
                        }
                        else if(data.type == 'business') {
                            $rootScope.pageTitle = data.businessName;
                        }
                        return data;
                    },
                    function (errorMessage, status) {
                        $location.path('/feed');
                    });
                }
            },
            access: 'loggedIn'
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
    }]);
});