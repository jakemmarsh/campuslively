/*
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'lib': './lib',
        'async': './lib/async',
        'domReady': './lib/requirejs/domReady',
        'angular': './lib/angular/angular.min',
        'http-auth-interceptor': './lib/angular/http-auth-interceptor',
        'angular-local-storage': './lib/angular/angular-local-storage',
        'angular-sanitize' : './lib/angular/angular-sanitize.min',
        'angular-animate' : './lib/angular/angular-animate.min',
        'angular-ui-bootstrap' : './lib/angular/ui-bootstrap-0.6.0.min',
        'angular-ui-router' : './lib/angular/angular-ui-router.min',
        'angular-switch-toggle' : './lib/angular/ng-switch-toggle',
        'angular-ui-map' : './lib/angular/ui-map',
        'angular-ui-event' : './lib/angular/event',
        'angular-easyfb' : './lib/angular/angular-easyfb.min',
        'jquery' : './lib/jquery-2.0.3.min',
        'jquery-ui' : './lib/jquery-ui',
        'fullCalendar' : './lib/fullcalendar.min',
        'angular-ui-calendar' : './lib/angular/ui-calendar',
        'select2' : './lib/select2.min',
        'angular-ui-select2' : './lib/angular/ui-select2',
        'image-upload' : './lib/angular/imageupload',
        'moment' : './lib/moment.min',
        'timepicker' : './lib/timepicker.min'
    },

    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'http-auth-interceptor': {
            deps: ['angular']
        },
        'angular-local-storage': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-ui-bootstrap': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-switch-toggle': {
            deps: ['angular', 'jquery']
        },
        'angular-ui-map': {
            deps: ['angular', 'angular-ui-event', 'async!http://maps.google.com/maps/api/js?sensor=false']
        },
        'angular-ui-event': {
            deps: ['angular']
        },
        'angular-easyfb': {
            deps: ['angular']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'fullCalendar': {
            deps: ['jquery-ui']
        },
        'angular-ui-calendar': {
            deps: ['angular', 'fullCalendar']
        },
        'select2': {
            deps: ['jquery']
        },
        'angular-ui-select2': {
            deps: ['angular', 'select2']
        },
        'image-upload': {
            deps: ['angular']
        },
        'timepicker': {
            deps: ['jquery']
        }
    }
});

require(['./bootstrap'], function () {
    //nothing to do here...see bootstrap.js
});