define(['./index', 'moment'], function (filters, moment) {
    moment().format();

	filters.filter('timePast', function() {
		return function(date) {
		    return moment(date).fromNow();
		};
	});
});