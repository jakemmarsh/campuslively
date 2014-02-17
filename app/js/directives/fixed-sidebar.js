define(['./index'], function (directives) {
  'use strict';
  // expand input and show post button on focus
  directives.directive('fixedSidebar', function() {
    return function(scope, element, attrs) {
    	$(element).hover(
    		// expand sidebar and slide over main content on hover
    		function() {
	    		$(element).css({
	    			'width': '150px'
	    		});

	    		$(element).siblings('.main').css({
	    			'-ms-transform': 'translate(100px, 0)',
	    			'moz-transform': 'translate(100px, 0)',
	    			'-webkit-transform': 'translate3d(100px, 0, 0)',
	    			'-transform': 'translate(150px, 0)'
	    		});
    		},
    		// shrink sidebar and slide main content back over on mouseleave
    		function() {
    			$(element).css({
	    			'width': '50px'
	    		});

	    		$(element).siblings('.main').css({
	    			'-ms-transform': 'none',
	    			'moz-transform': 'none',
	    			'-webkit-transform': 'none',
	    			'-transform': 'none'
	    		});
    		}
    	);

        angular.element(window).bind("scroll", function() {
             element.css('left', -this.pageXOffset);
        });
    };
  });
});