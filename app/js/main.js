/*
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'lib': './lib',
        'domReady': './lib/requirejs/domReady',
        'angular': './lib/angular/angular.min',
        'angular-sanitize' : './lib/angular/angular-sanitize.min',
        'angular-ui-bootstrap' : './lib/angular/ui-bootstrap-tpls-0.6.0.min',
        'angular-ui-router' : './lib/angular/angular-ui-router.min',
        'angular-switch-toggle' : './lib/angular/ng-switch-toggle',
        'jQuery' : '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min'
    },

    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jQuery']
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
        }
    }
});

require(['./bootstrap'], function () {
    //nothing to do here...see bootstrap.js
});