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

    app.run(['$rootScope', '$location', 'authService', 'localStorageService', function ($rootScope, $location, authService, localStorageService) {
        if(localStorageService.get('user')) {
            $rootScope.user = localStorageService.get('user');
        }

        $rootScope.$on('event:auth-loginConfirmed', function() {
            if($rootScope.originalDestination) {
                var originalDestination = $rootScope.originalDestination;
                $rootScope.originalDestination = null;
                $location.path(originalDestination);
            }
            else {
                $location.path('/feed');
            }
        });

        $rootScope.$on('event:auth-loginRequired', function() {
            localStorageService.clearAll();
            $rootScope.user = null;
            $location.path('/login');
        });

        // take actions based on user's logged in status and destination page's protection level
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            // if user is not logged in and state requires user to be logged in
            if(!$rootScope.user && toState.access == 'loggedIn') {
                $rootScope.originalDestination = $location.path();
                $location.path('/login');
            }
            // if user is already logged in and state requires user to not be logged in
            else if($rootScope.user && toState.access == 'notLoggedIn') {
                $location.path('/feed');
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
            return ($rootScope.user !== null);
        }

        // global function to log user out
        $rootScope.logout = function() {
            authService.logout($rootScope.user).then(function (data, status) {
                $rootScope.user = null;
                localStorageService.clearAll();
                $location.path('/');
            },
            function (errorMessage, status) {
                console.log(errorMessage);
            });
        }
    }]);

    require(['domReady!'], function (document) {
        return ng.bootstrap(document, ['app']);
    });
});