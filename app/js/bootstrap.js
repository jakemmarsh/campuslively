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
        $rootScope.user = null;
        // take actions based on user's logged in status and destination page's protection level
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            userService.isLoggedIn().then(function (data, status) {
                // if user is not logged in
                if(!data.loggedIn) {
                    $rootScope.user = null;
                    // if page requires user to be logged in
                    if(toState.access == 'loggedIn') {
                        $rootScope.originalDestination = $location.path();
                        $location.path('/login');
                    }
                }
                // if user is already logged in
                else if(data.loggedIn) {
                    $rootScope.user = data.user;
                    // if page requires user to NOT be logged in
                    if(toState.access == 'notLoggedIn') {
                        $location.path('/feed');
                    }
                }
            }, function (errorMessage, status) {
                    console.log(errorMessage);
            });
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
            return ($rootScope.user !== null);
        }

        // global function to log user out
        $rootScope.logout = function() {
            userService.logout($rootScope.user).then(function (data, status) {
                $rootScope.user = null;
                $location.path('/');
            },
            function (errorMessage, status) {
                console.log(errorMessage);
            });
        }
    });

    require(['domReady!'], function (document) {
        return ng.bootstrap(document, ['app']);
    });
});