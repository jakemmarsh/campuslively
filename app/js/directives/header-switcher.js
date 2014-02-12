define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('headerSwitcher', function() {
    return {
      restrict: 'A',
      scope: {
        elementType: '='
      },
      link: function(scope, element, attrs) {
        var headers = $(element).children(scope.elementType),
            headerIndex = -1;

        function showNextHeader() {
          ++headerIndex;
          // show first header immediately
          if(headerIndex === 0) {
            headers.eq(headerIndex % headers.length)
            .show()
            .delay(2500)
            .fadeOut(1000, showNextHeader);
          }
          // then fade them in
          else {
            headers.eq(headerIndex % headers.length)
            .fadeIn(1000)
            .delay(2500)
            .fadeOut(1000, showNextHeader);
          }
        }
        showNextHeader();

      }
    };
  });
});