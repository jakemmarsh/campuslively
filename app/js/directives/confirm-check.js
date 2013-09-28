define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('confirmCheck', function() {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstField = '#' + attrs.confirmCheck;
        elem.add(firstField).on('keyup', function () {
          scope.$apply(function () {
            var v = (elem.val() === $(firstField).val());
            ctrl.$setValidity(attrs.confirmModel, v);
          });
        });
      }
    }
  });
});