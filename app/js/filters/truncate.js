define(['./index'], function (filters) {
    filters.filter('words', function () {
        return function (input, words, eventId) {
            if (isNaN(words)) {
                return input;
            }
            if (words <= 0) {
                return '';
            }
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                    if(eventId) {
                    	var eventAddress = "/event/" + eventId;
                    	input += ' <a href="' + eventAddress + '">See More</a>';
                    }
                }
            }
            return input;
        };
    });
});