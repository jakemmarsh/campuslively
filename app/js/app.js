define([
    'angular',
    'angular-sanitize',
    'angular-ui-bootstrap',
    'angular-ui-router',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'ngSanitize',
        'ui.bootstrap', 
        'ui.state'
    ]);
});