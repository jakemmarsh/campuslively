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

    // initialize FB app access
    app.config(['$FBProvider', function ($FBProvider) {
        $FBProvider.setInitParams({
            appId: '458852510898409'
        });
    }]);

    app.run(['$rootScope', '$location', 'authService', 'localStorageService', '$FB', 'userService', '$q', function ($rootScope, $location, authService, localStorageService, $FB, userService, $q) {
        if(localStorageService.get('user')) {
            // temporarily use user from cookie/local storage
            $rootScope.user = localStorageService.get('user');

            // update user from API to get any changes
            userService.getUserById($rootScope.user._id).then(function(data) {
                $rootScope.user = data;
                localStorageService.add('user', data);

                // set school color
                $rootScope.schoolColor = $rootScope.user.school.color;
            });
        }

        $rootScope.$on('event:auth-loginConfirmed', function() {
            // set school color
            $rootScope.schoolColor = $rootScope.user.school.color;

            // navigate to original destination if one exists
            if($rootScope.originalDestination) {
                var originalDestination = $rootScope.originalDestination;
                $rootScope.originalDestination = null;
                $location.path(originalDestination);
            }
            else {
                $location.path('/feed');
            }
            checkFbStatusAndSubscriptions();
        });

        $rootScope.$on('event:auth-loginRequired', function() {
            if(!$rootScope.originalDestination) {
                $rootScope.originalDestination = $location.path();
            }
            localStorageService.clearAll();
            $rootScope.user = null;
            $location.path('/login');
        });

        // take actions based on user's logged in status and destination page's protection level
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            // if user is not logged in and state requires user to be logged in
            if(!$rootScope.user && toState.access === 'loggedIn') {
                $rootScope.originalDestination = $location.path();
                $location.path('/login');
            }
            // if user is already logged in and state requires user to not be logged in
            else if($rootScope.user && toState.access === 'notLoggedIn') {
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
        $rootScope.isCurrentPage = function(path) {
            if ($location.path().substr(0, path.length) === path) {
              return true;
            }
            else {
              return false;
            }
        };

        // global function to get user's logged in status
        $rootScope.isLoggedIn = function() {
            return ($rootScope.user !== null);
        };

        // update facebook login status
        $rootScope.updateFbStatus = function(more) {
            $FB.getLoginStatus(function (res) {
                $rootScope.fbStatus = res;

                (more || angular.noop)();
            });
        };

        // check FB status on app load
        // update user subscriptions if a week has passed since lastUpdated
        function checkFbStatusAndSubscriptions() {
            $FB.getLoginStatus(function (res) {
                $rootScope.fbStatus = res;

                if($rootScope.fbStatus.status === 'connected') {
                    var lastUpdated = new Date($rootScope.user.facebook.lastUpdated),
                        oneWeekAgo = new Date(),
                        fbSubscriptions = [],
                        updateParams = {};

                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                    if(lastUpdated <= oneWeekAgo) {
                        $q.all([
                            $FB.api('/me/likes', {limit: 9999, fields: 'id'}),
                            $FB.api('/me/subscribedto', {limit: 9999, fields: 'id'})
                        ])
                        .then(function (rsvList) {
                            // result of api('/me/likes')
                            for(var i = 0; i < rsvList[0].data.length; i++) {
                                fbSubscriptions.push(rsvList[0].data[i].id);
                            }

                            // result of api('/me/subscribedto')
                            for(var j = 0; j < rsvList[1].data.length; j++) {
                                fbSubscriptions.push(rsvList[1].data[j].id);
                            }
                            updateParams.facebook = {};
                            updateParams.facebook.subscriptions = fbSubscriptions;
                            userService.updateUser($rootScope.user._id, updateParams).then(function (data) {
                                userService.addFacebookSubscriptions($rootScope.user._id).then(function (data) {
                                    $rootScope.user = data;
                                    localStorageService.add('user', data);
                                });
                            });
                        });
                    }
                }
            });
        };
        if($rootScope.user) {
            checkFbStatusAndSubscriptions();
        }

        // get latest FB details
        $rootScope.updateApiMe = function() {
            $FB.api('/me', function (res) {
                $rootScope.fbMe = res;
            });
        };

        $rootScope.eventPassed = function(eventDate) {
            return new Date(eventDate) < new Date();
        };

        // global function to log user out
        $rootScope.logout = function() {
            authService.logout($rootScope.user).then(function (data) {
                $rootScope.user = null;
                localStorageService.clearAll();
                $location.path('/');
            },
            function () {
                $rootScope.user = null;
                localStorageService.clearAll();
                $location.path('/');
            });
        };
    }]);

    require(['domReady!'], function (document) {
        return ng.bootstrap(document, ['app']);
    });
});