/**
 * Defines any functions to be called immediately upon running the app.
 */

define(['./app'], function (app) {
    'use strict';
    app.run(function ($rootScope) {
        // change page title based on state
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            $rootScope.pageTitle = toState.title;
        });
    });
});