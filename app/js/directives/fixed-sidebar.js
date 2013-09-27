define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('fixedSidebar', function() {
    return function(scope, element, attrs) {
        angular.element(window).bind("scroll", function() {
             element.css('left', -this.pageXOffset);
        });
    };
  });
});