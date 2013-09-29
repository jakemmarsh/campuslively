define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('ngBlur', function() {
    return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.bind('blur', function () {
                    scope.$apply(attrs.ngBlur);
                });
            }
    };
  });
});