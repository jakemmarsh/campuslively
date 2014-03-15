define(['./index'], function (directives) {
    directives.directive("inputSelect", [function () {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            // highlight all text for easy copying
            element.select();
          });
        }
      };
    }]);
});