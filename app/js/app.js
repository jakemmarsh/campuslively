define([
    'angular',
    'angular-sanitize',
    'angular-animate',
    'angular-ui-bootstrap',
    'angular-ui-router',
    'angular-switch-toggle',
    'angular-ui-map',
    'angular-ui-calendar',
    'angular-ui-select2',
    'image-upload',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index',
    './animations/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.animations',
        'ngSanitize',
        'ngAnimate',
        'ui.bootstrap', 
        'ui.state',
        'ngSwitchToggle',
        'ui.map',
        'ui.calendar',
        'ui.select2',
        'imageupload'
    ]);
});