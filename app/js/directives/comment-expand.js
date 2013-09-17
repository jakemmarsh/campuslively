define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('expandComment', function() {
    var origHeight;

    return {
      restrict: 'A',
 
      link: function(scope, element, attrs) {
        element.bind('focus', expand);
        element.bind('blur', contract);
 
        function expand() {
          origHeight = $(element).height();
          $(element).css('height', '150px');
          $(element).siblings('.btn').toggleClass('hidden');
        }

        function contract() {
          $(element).height(origHeight);
          $(element).siblings('.btn').toggleClass('hidden');
        }
      }
    };
  });
});