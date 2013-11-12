define(['./index', 'timepicker'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('timeAutocomplete', [function() {
    return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {
                attrs.$observe("timeAutocomplete", function() {
                    $(element).timepicker('remove');
                    if(attrs.timeAutocomplete) {
                        $(element).timepicker({ 
                            'step': 15,
                            'minTime': attrs.timeAutocomplete,
                            'showDuration': true
                        });
                    }
                    else {
                        $(element).timepicker({ 
                        'step': 15
                    });
                    }
                });

                $(element).on('changeTime', function () {
                    scope.$apply(function () {
                        ngModel.$setViewValue(element.val());
                    });
                });
            }
    };
  }]);
});