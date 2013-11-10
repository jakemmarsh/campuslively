define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('timeAutocomplete', function() {
    return {
            restrict: 'A',
            require: "ngModel",
            scope: {
                startTime: '='
            },
            link: function(scope, element, attrs) {
                require(["time-autocomplete"],
                    function() {
                        if(scope.startTime) {
                            $(element).timeAutocomplete({
                                increment: 15,
                                value: '20:00:00',
                                from_selector: scope.startTime
                            });
                        }
                        else {
                            $(element).timeAutocomplete({
                                increment: 15,
                                value: '20:00:00'
                            });
                        }
                    }
                );
            }
    };
  });
});