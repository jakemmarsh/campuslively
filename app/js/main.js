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
        'angular-sanitize' : './lib/angular/angular-sanitize.min',
        'angular-ui-bootstrap' : './lib/angular/ui-bootstrap-0.6.0.min',
        'angular-ui-router' : './lib/angular/angular-ui-router.min',
        'angular-switch-toggle' : './lib/angular/ng-switch-toggle',
        'angular-ui-map' : './lib/angular/ui-map',
        'angular-ui-event' : './lib/angular/event',
        'jQuery' : '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        'jQuery-ui' : '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
        'fullCalendar' : './lib/fullcalendar.min',
        'angular-ui-calendar' : './lib/angular/ui-calendar'
    },

    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jQuery', 'jQuery-ui', 'fullCalendar']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-ui-bootstrap': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-switch-toggle': {
            deps: ['angular', 'jQuery']
        },
        'angular-ui-map': {
            deps: ['angular', 'angular-ui-event', 'async!http://maps.google.com/maps/api/js?sensor=false']
        },
        'angular-ui-event': {
            deps: ['angular']
        },
        'jQuery-ui': {
            deps: ['jQuery']
        },
        'fullCalendar': {
            deps: ['jQuery-ui']
        },
        'angular-ui-calendar': {
            deps: ['angular', 'fullCalendar']
        }
    }
});

require(['./bootstrap'], function () {
    //nothing to do here...see bootstrap.js
});