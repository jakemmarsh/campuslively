define(['./index'], function (services) {
  'use strict';
  // expand input and show post button on focus
  services.service('userService', function($q, $http) {
    return {
    	originalDestination: null,
    	loggedIn: false,
		isLoggedIn: function() {
			return this.loggedIn;
		},
		getOriginalDestination: function() {
			return this.originalDestination;
		}
    }
  });
});