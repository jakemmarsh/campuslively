define([
    'angular',
    'http-auth-interceptor',
    'angular-local-storage',
    'angular-sanitize',
    'angular-animate',
    'angular-ui-bootstrap',
    'angular-ui-router',
    'angular-switch-toggle',
    'angular-ui-map',
    'angular-ui-calendar',
    'angular-ui-select2',
    'angular-easyfb',
    'image-upload',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index',
    './animations/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'http-auth-interceptor',
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.animations',
        'LocalStorageModule',
        'ngSanitize',
        'ngAnimate',
        'ui.bootstrap', 
        'ui.router',
        'ngSwitchToggle',
        'ui.map',
        'ui.calendar',
        'ui.select2',
        'ezfb',
        'imageupload'
    ]);
});