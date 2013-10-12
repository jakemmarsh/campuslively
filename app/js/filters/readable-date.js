define(['./index', 'moment'], function (filters, moment) {
    moment().format();

	filters.filter('readableDate', function() {
		return function(date) {
		    return moment(date).format('dddd, MMMM Do, YYYY');
		};
	});
});