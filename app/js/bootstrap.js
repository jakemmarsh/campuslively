/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'require',
    'angular',
    'app',
    'routes',
    'impl'
], function (require, ng, app) {
    'use strict';

    app.run(function ($rootScope, $location) {
        // change page title based on state
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if(toState.title) {
                $rootScope.pageTitle = toState.title;
            }
        });

        $rootScope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
              return true;
            } 
            else {
              return false;
            }
        }

        $rootScope.logout = function() {
            console.log('signing out');
            $location.path('/');
        }
    });

    require(['domReady!'], function (document) {
        return ng.bootstrap(document, ['app']);
    });
});