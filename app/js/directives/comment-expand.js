define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('expandComment', function() {
    return {
      restrict: 'A',
 
      link: function(scope, element, attrs) {
        element.bind('focus', expand);
        element.bind('blur', contract);
 
        function expand() {
          $(element).css('height', '150px');
          $(element).siblings('.btn').removeClass('hidden');
        }

        function contract() {
          if(!$(element).val()) {
            $(element).height(33);
            $(element).siblings('.btn').addClass('hidden');
          }
        }
      }
    };
  });
});