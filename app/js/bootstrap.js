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

    app.run(function ($rootScope, $location, userService) {
        // take actions based on user's logged in status and destination page's protection level
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            // if page requires user to be logged in
            if(toState.access == 'loggedIn') {
                // if user isn't logged in
                if(!userService.isLoggedIn()) {
                    userService.originalDestination = $location.path();
                    $location.path('/login');
                }
            }
            // if page requiresu ser to NOT be logged in
            else if(toState.access == 'notLoggedIn') {
                // if user is already logged in
                if(userService.isLoggedIn()) {
                    $location.path('/feed');
                }
            }
        });

        // change page title based on state
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if(toState.title) {
                $rootScope.pageTitle = toState.title;
            }
        });

        // global function to highlight current page link
        $rootScope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
              return true;
            } 
            else {
              return false;
            }
        }

        // global function to get user's logged in status
        $rootScope.isLoggedIn = function() {
            return userService.isLoggedIn();
        }

        // global function to log user out
        $rootScope.logout = function() {
            userService.loggedIn = false;
            $location.path('/');
        }
    });

    require(['domReady!'], function (document) {
        return ng.bootstrap(document, ['app']);
    });
});