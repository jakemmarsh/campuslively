define(['./index'], function (animations) {
  'use strict';
  animations.animation('.loading', function() {
    return {
      addClass : function(element, className, done) {
        if(className === 'ng-hide') {
          jQuery(element).animate({
            top: '-100px'
          }, 1000, done);
        }
        else {
          done();
        }
      },
      removeClass : function(element, className, done) {
        if(className === 'ng-hide') {
          element.css('top','-100px');

          /* remove it early so you can animate on it since
             it is not possible using element.css() to set
             a style using !important */
          element.removeClass('ng-hide'); 
          jQuery(element).animate({
            top:0
          }, 0, done);
        }
        else {
          done();
        }
      }
    };
  });
});