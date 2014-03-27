define(['angular', 'app'], function(angular, app) { app.run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('partials/about.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">About Us</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"line soft--bottom\">\n" +
    "\t\t<div class=\"unit one-sixth soft-half--right\">\n" +
    "\t\t\t<a href=\"/profile/jakemmarsh\"><div class=\"user-img-about\" style=\"background-image:url('http://assets.campuslively.com/img/jake.jpg')\"></div></a>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit five-sixths last-unit\">\n" +
    "\t\t\t<a href=\"/profile/jakemmarsh\" class=\"blue\"><h2 class=\"flush normal-lh\">Jake Marsh</h2></a>\n" +
    "\t\t\t<h3 class=\"flush--sides nudge-half--ends weight--bold\">Co-Founder, CEO</h3>\n" +
    "\t\t\t<p class=\"nudge-half--bottom\">Jake Marsh is from Hampden, Maine and is now a Junior at the University of Maine double majoring in Computer Science and Economics. While attending UMaine he has helped to redesign and redevelop the university's online magazine, participated in the Student Portfolio Investment Fund, and has also completed many other outside projects. During the Summer of 2013 he worked as a Software Engineering Intern in Chicago, Illinois.</p>\n" +
    "\t\t\t<a href=\"https://twitter.com/jakemmarsh\" class=\"icon-link\" target=\"_blank\"><i class=\"fa fa-twitter beta nudge-half--right\" tooltip=\"Twitter\"></i></a>\n" +
    "\t\t\t<a href=\"http://www.linkedin.com/in/jakemmarsh\" class=\"icon-link\" target=\"_blank\"><i class=\"fa fa-linkedin beta nudge-half--right\" tooltip=\"LinkedIn\"></i></a>\n" +
    "\t\t\t<a href=\"mailto:jake@campuslively.com\" class=\"icon-link\"><i class=\"fa fa-envelope beta\" tooltip=\"Email\"></i></a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<hr />\n" +
    "\t<div class=\"line soft--top\">\n" +
    "\t\t<div class=\"unit one-sixth soft-half--right\">\n" +
    "\t\t\t<a href=\"/profile/mslick32\"><div class=\"user-img-about\" style=\"background-image: url('http://assets.campuslively.com/img/matt.jpg')\"></div></a>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit five-sixths last-unit\">\n" +
    "\t\t\t<a href=\"/profile/slickm32\" class=\"blue\"><h2 class=\"flush normal-lh\">Matt Sliwkowski</h2></a>\n" +
    "\t\t\t<h3 class=\"flush--sides nudge-half--ends weight--bold\">Co-Founder, COO</h3>\n" +
    "\t\t\t<p class=\"nudge-half--bottom\">Matt Sliwkowski is from Sudbury, Massachusetts and is currently a senior at Boston University’s School of Management, concentrating in finance and entrepreneurship.  Since attending BU, Matt has been heavily involved with startups.  His sophomore year, he helped The Harvard Bartending Course expand operations to BU.  This past Summer, he was accepted into BU’s ITEC Accelerator Program for one of his ventures. He has also worked with MassChallenge finalist, TapWalk.</p>\n" +
    "\t\t\t<a href=\"http://www.linkedin.com/pub/matthew-sliwkowski/33/591/997\" class=\"icon-link\" target=\"_blank\"><i class=\"fa fa-linkedin beta nudge-half--right\" tooltip=\"LinkedIn\"></i></a>\n" +
    "\t\t\t<a href=\"mailto:matt@campuslively.com\" class=\"icon-link\"><i class=\"fa fa-envelope beta\" tooltip=\"Email\"></i></a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/activate.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Activate Your Account</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<h1 class=\"green flush\">Account Activated!</h1>\n" +
    "\t<p class=\"gamma nudge--ends\">Your account has been successfully activated, and you are now able to log in.</p>\n" +
    "\t<a href=\"/login\" class=\"btn\">Log In</a>\n" +
    "</div>"
  );


  $templateCache.put('partials/calendar.html',
    "<div class=\"loading\" ng-show=\"loading\">\n" +
    "\t<h2 class=\"flush\" ng-show=\"loading && !gettingPosition\">Loading...</h2>\n" +
    "\t<h2 class=\"flush\" ng-show=\"gettingPosition\">Getting your location...</h2>\n" +
    "</div>\n" +
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height full-width\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Events Calendar</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half text-right\">\n" +
    "\t\t\t\t<ng-switch-toggle-group theme=\"candy\" ng-model=\"currentView\" choices=\"viewOptions\" class=\"float-right\" style=\"display:none;\"></ng-switch-toggle-group>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div ui-calendar=\"calendarOptions\" ng-model=\"events\" calendar=\"eventCalendar\" class=\"nudge-half--bottom\"></div>\n" +
    "\t<div ng-show=\"loadingDayEvents\" class=\"text-center soft--ends\">\n" +
    "\t\t<div class=\"box island inline-block\">\n" +
    "\t\t\t<h1 class=\"flush blue\">Loading events...</h1>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div ng-hide=\"currentView == 'school' || dayEvents.length || loadingDayEvents || !showDay\" class=\"text-center soft--ends\">\n" +
    "\t\t<h1 class=\"blue nudge--ends\">There are no upcoming events near you on {{ selectedDay | readableDate}} yet!</h1>\n" +
    "\t\t<a href=\"/post\" class=\"btn nudge--top\">Post One</a>\n" +
    "\t</div>\n" +
    "\t<div ng-hide=\"currentView == 'nearby' || dayEvents.length || loadingDayEvents || !showDay\" class=\"text-center soft--ends\">\n" +
    "\t\t<h1 class=\"blue nudge--ends\">There are no upcoming events for your school on {{ selectedDay | readableDate}} yet!</h1>\n" +
    "\t\t<a href=\"/post\" class=\"btn nudge--top\">Post One</a>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"showDay && dayEvents.length && !loadingDayEvents\" id=\"dayEvents\">\n" +
    "\t\t<div class=\"table full-width\">\n" +
    "\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t\t\t<h2 class=\"flush nudge-half--bottom\">Events on {{ selectedDay | readableDate }}</h2>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"td one-half vertical-align-middle text-right\">\n" +
    "\t\t\t\t\t<div class=\"dropdown\">\n" +
    "\t\t\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t\t\t{{ currentSort.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t<ul class=\"dropdown-menu pull-right\" style=\"left:none !important;right:0;\">\n" +
    "\t\t\t\t\t\t\t<li ng-repeat=\"option in sortOptions\">\n" +
    "\t\t\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changeSort(option)\"></a>\n" +
    "\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<hr />\n" +
    "\t\t<div class=\"line fade nudge--ends\" ng-repeat=\"event in dayEvents | orderBy:currentSort.value\">\n" +
    "\t\t\t<article ng-include=\"'templates/event.html'\"></article>\n" +
    "\t\t</div><!-- event end -->\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"attendingModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Attending</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<ul ng-show=\"items.length\" class=\"modal-user-list table full-width\">\n" +
    "\t        <li ng-repeat=\"attendingUser in items\" class=\"tr full-width\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td nine-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\" class=\"weight--bold\" ng-bind=\"attendingUser.displayName\"></a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<div ng-hide=\"items.length\">\n" +
    "\t\t\t<h2 class=\"flush green text-center\">No one has RSVPd to this event yet!</h2>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"shareModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Share Event</h2>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/contact.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Contact Us</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<form name=\"contactForm\" ng-submit=\"sendMessage()\" ng-hide=\"messageSent\">\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-tenth label-container\">\n" +
    "\t\t\t\t<label for=\"subject\" class=\"caps weight--bold\">Subject</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit last-unit nine-tenths\">\n" +
    "\t\t\t\t<input type=\"text\" id=\"subject\" ng-model=\"message.subject\" class=\"full-width\" placeholder=\"Message subject\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\" ng-show=\"!user\">\n" +
    "\t\t\t<div class=\"unit one-tenth label-container\">\n" +
    "\t\t\t\t<label for=\"email\" class=\"caps weight--bold\">Email <span class=\"red\">*</span></label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit last-unit nine-tenths\">\n" +
    "\t\t\t\t<input type=\"email\" id=\"email\" ng-model=\"message.replyAddress\" class=\"full-width\" placeholder=\"sample@email.com\" ng-required=\"!user\" />\n" +
    "\t\t\t\t<span class=\"epsilon muted\">If you would like us to be able to respond to your message, please provide a valid email address to contact you at.</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-tenth label-container\">\n" +
    "\t\t\t\t<label for=\"message\" class=\"caps weight--bold\">Message <span class=\"red\">*</span></label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit last-unit nine-tenths\">\n" +
    "\t\t\t\t<textarea id=\"message\" ng-model=\"message.body\" class=\"full-width big\" placeholder=\"Your message\" required></textarea>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit nine-tenths\">\n" +
    "\t\t\t\t<span class=\"red weight--bold\" ng-show=\"sendError\" ng-bind=\"sendError\"></span>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit last-unit one-tenth text-right\">\n" +
    "\t\t\t\t<input type=\"submit\" class=\"btn\" value=\"Send Message\" ng-disabled=\"contactForm.$invalid\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</form>\n" +
    "\t<div ng-show=\"messageSent\">\n" +
    "\t\t<h1 class=\"green flush\">Message Sent!</h1>\n" +
    "\t\t<p class=\"gamma nudge--top\">Thank you for contacting us. If your message requires a response, we will get back to you as soon as possible.</p>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/event.html',
    "<div class=\"white-top normal-lh\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t<div class=\"td three-fifths vertical-align-middle text-left\">\n" +
    "\t\t\t\t<h2 class=\"flush--top nudge-half--bottom height--normal\">\n" +
    "\t\t\t\t\t<span ng-bind=\"event.title\"></span>\n" +
    "\t\t\t\t\t<i class=\"muted weight--normal zeta fa fa-circle-o\" ng-show=\"event.privacy == 'inviteOnly'\" tooltip=\"Invite Only\" tooltip-placement=\"right\"></i>\n" +
    "\t\t\t\t\t<i class=\"muted weight--normal zeta fa fa-circle\" ng-show=\"event.privacy == 'public'\" tooltip=\"Public\" tooltip-placement=\"right\"></i>\n" +
    "\t\t\t\t</h2>\n" +
    "\t\t\t\t<h4 class=\"flush muted weight--normal\" ng-show=\"event.creator\">\n" +
    "\t\t\t\t\thosted by\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{ event.creator.username }}\">{{event.creator.displayName}}</a>\n" +
    "\t\t\t\t</h4>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td two-fifths vertical-align-middle text-right\" ng-hide=\"eventPassed\">\n" +
    "\t\t\t\t<a href class=\"btn nudge-half--right\" ng-click=\"rsvpToEvent(event)\" ng-hide=\"isAttending()\"><i class=\"fa fa-thumbs-up\"></i> RSVP</a>\n" +
    "\t\t\t\t<a href class=\"btn nudge-half--right\" ng-click=\"unRsvpToEvent(event)\" ng-show=\"isAttending()\"><i class=\"fa fa-thumbs-o-up\"></i> Un-RSVP</a>\n" +
    "\t\t\t\t<a href class=\"btn nudge-half--right\" ng-click=\"open('invite')\"><i class=\"fa fa-plus-square\"></i> Invite</a>\n" +
    "\t\t\t\t<a class=\"btn\" ng-click=\"open('share')\"><i class=\"fa fa-share-square\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"event-img nudge-half--bottom\" ng-show=\"event.pictureUrl\" ng-style=\"{'background-image': 'url(' + event.pictureUrl + ')'}\"></div>\n" +
    "\t<div class=\"line text-left\">\n" +
    "\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t<div class=\"box islet\">\n" +
    "\t\t\t\t<div class=\"event-option-buttons\">\n" +
    "\t\t\t\t<a href class=\"btn--muted epsilon nudge-quarter--right\" ng-click=\"open('edit')\" ng-show=\"event.creator._id == user._id || user.admin == true\">Edit</a>\n" +
    "\t\t\t\t\t<a href class=\"btn--muted epsilon\" ng-click=\"open('delete')\" ng-show=\"event.creator._id == user._id || user.admin == true\">Delete Event</a>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\" ng-show=\"event.startDate\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t<h4 class=\"flush--top nudge-half--bottom\"><i class=\"muted fa fa-calendar-o\"></i></h4>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit\">\n" +
    "\t\t\t\t\t\t<p class=\"nudge-half--bottom\"><span ng-bind=\"event.startDate | readableDate\"></span> <span class=\"red nudge-half--left\" ng-show=\"eventPassed\">(Event has passed)</span></p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\" ng-show=\"event.startTime\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t<h4 class=\"flush--top nudge-half--bottom\"><i class=\"muted fa fa-clock-o\"></i></h4>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit\">\n" +
    "\t\t\t\t\t\t<p class=\"nudge-half--bottom\"><span ng-bind=\"event.startTime\"></span><span ng-show=\"event.endTime\"> - <span ng-bind=\"event.endTime\"></span></span></p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\" ng-show=\"event.locationName\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t<h4 class=\"flush--top nudge-half--bottom\"><i class=\"muted fa fa-map-marker\"></i></h4>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit\">\n" +
    "\t\t\t\t\t\t<p class=\"nudge-half--bottom\">{{event.locationName}}<span ng-show=\"event.roomNumber\" ng-bind=\"', Room: ' + event.roomNumber\"></span></p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div ui-map=\"locationMap\" ui-options=\"mapOptions\" ui-event=\"{'map-tilesloaded': 'placeMarker()'}\" class=\"map nudge-half--bottom\" ng-show=\"hasLocation\"></div>\n" +
    "\t\t\t\t<div class=\"line\" ng-show=\"event.description\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t<h4 class=\"flush\"><i class=\"muted fa fa-align-left\"></i></h4>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit\">\n" +
    "\t\t\t\t\t\t<p class=\"pre-wrap\" ng-bind-html=\"event.description | urlAndFormat\"></p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<form name=\"commentForm\" class=\"full-width nudge-half--top clearfix\" ng-submit=\"postComment()\" ng-hide=\"eventPassed\">\n" +
    "\t\t\t\t<textarea placeholder=\"Write a comment...\" class=\"full-width no-resize to-expand\" ng-model=\"commentBody\" expand-comment required></textarea>\n" +
    "\t\t\t\t<button type=\"submit\" class=\"btn nudge-half--ends float-right hidden\" ng-disabled=\"commentForm.$invalid\">Post</button>\n" +
    "\t\t\t</form>\n" +
    "\t\t\t<div class=\"line nudge-half--bottom\" ng-repeat=\"comment in event.comments | orderBy: '-posted'\">\n" +
    "\t\t\t\t<div class=\"unit one-tenth\">\n" +
    "\t\t\t\t\t<div class=\"user-img-comment\" ng-style=\"{'background-image': 'url(' + comment.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a tooltip=\"{{comment.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"profile/{{comment.creator.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit nine-tenths last-unit\">\n" +
    "\t\t\t\t\t<div class=\"box islet comment\">\n" +
    "\t\t\t\t\t\t<a href class=\"delete-comment-button\" ng-click=\"deleteComment(comment)\" ng-show=\"comment.creator._id == user._id || user.admin == true\">\n" +
    "\t\t\t\t\t\t\t<i class=\"fa fa-times\"></i>\n" +
    "\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t<h4 class=\"flush\">\n" +
    "\t\t\t\t\t\t\t<a ng-href=\"/profile/{{comment.creator.username}}\" ng-show=\"comment.creator\">{{comment.creator.displayName}}</a>\n" +
    "\t\t\t\t\t\t\t<span class=\"muted\" ng-hide=\"comment.creator\">[deleted]</span>\n" +
    "\t\t\t\t\t\t</h4>\n" +
    "\t\t\t\t\t\t<p class=\"nudge-half--ends pre-wrap\" ng-bind-html=\"comment.body | urlAndFormat\"></p>\n" +
    "\t\t\t\t\t\t<div class=\"table full-width\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td one-half\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons comment nudge-half--top\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a class=\"first cursor-normal\" href><span class=\"gamma\" ng-class=\"{green: likesComment(comment)}\">{{ comment.likes.length }}</span></a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"likeComment(comment)\" ng-hide=\"likesComment(comment)\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-heart\"></i> Like\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"unlikeComment(comment)\" ng-show=\"likesComment(comment)\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-heart-o\"></i> Unlike\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td one-half text-right\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"muted epsilon\" ng-bind=\"comment.timestamp | timePast\"></span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<hr class=\"nudge-half--ends\" />\n" +
    "\t\t\t\t\t\t<div class=\"line nudge-half--bottom\" ng-repeat=\"subComment in comment.subComments\">\n" +
    "\t\t\t\t\t\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"user-img-subcomment\" ng-style=\"{'background-image': 'url(' + subComment.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t\t\t\t<a tooltip=\"{{subComment.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"profile/{{subComment.creator.username}}\"></a>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"unit eleven-twelfths last-unit subcomment-body islet\">\n" +
    "\t\t\t\t\t\t\t\t<a href class=\"delete-subcomment-button\" ng-click=\"deleteSubComment(comment._id, subComment)\" ng-show=\"subComment.creator._id == user._id || user.admin == true\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"fa fa-times\"></i>\n" +
    "\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t<p class=\"epsilon\" ng-bind-html=\"subComment.body | urlAndFormat\"></p>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"text-right nudge-half--top\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"muted epsilon\" ng-bind=\"subComment.timestamp | timePast\"></span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<form name=\"subCommentForm\" class=\"input-append full-width clearfix epsilon\" ng-submit=\"postSubComment(comment)\">\n" +
    "\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Write a comment...\" ng-model=\"comment.newSubComment\" class=\"nine-tenths delta\" required />\n" +
    "\t\t\t\t\t\t\t<button type=\"submit\" class=\"btn one-tenth\" ng-disabled=\"subCommentForm.$invalid\">Post</button>\n" +
    "\t\t\t\t\t\t</form>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit one-fourth last-unit soft-half--left\">\n" +
    "\t\t\t<div class=\"box nudge-half--bottom\">\n" +
    "\t\t\t\t<div class=\"grey-header soft-quarter--ends soft-half--sides\">\n" +
    "\t\t\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t<h2 class=\"flush\" ng-hide=\"eventPassed\">Going</h2>\n" +
    "\t\t\t\t\t\t\t<h2 class=\"flush\" ng-show=\"eventPassed\">Went</h2>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"td one-half vertical-align-middle text-right muted\">\n" +
    "\t\t\t\t\t\t\t<span ng-bind=\"event.attending.length\"></span>\n" +
    "\t\t\t\t\t\t\t<span ng-show=\"event.attending.length == 1\">person</span>\n" +
    "\t\t\t\t\t\t\t<span ng-hide=\"event.attending.length == 1\">people</span>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"islet text-center\" ng-show=\"event.attending.length > 0\">\n" +
    "\t\t\t\t\t<div ng-repeat=\"attendingUser in event.attending\" class=\"user-img-going nudge-half--right\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a href ng-href=\"profile/{{attendingUser.username}}\" tooltip=\"{{attendingUser.displayName}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"box nudge-half--bottom\">\n" +
    "\t\t\t\t<div class=\"grey-header soft-quarter--ends soft-half--sides\">\n" +
    "\t\t\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t<h2 class=\"flush\">Invited</h2>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"td one-half vertical-align-middle text-right muted\">\n" +
    "\t\t\t\t\t\t\t<span ng-bind=\"event.invited.length\"></span>\n" +
    "\t\t\t\t\t\t\t<span ng-show=\"event.invited.length == 1\">person</span>\n" +
    "\t\t\t\t\t\t\t<span ng-hide=\"event.invited.length == 1\">people</span>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"islet text-center\" ng-show=\"event.invited.length > 0\">\n" +
    "\t\t\t\t\t<div ng-repeat=\"attendingUser in event.invited\" class=\"user-img-going nudge-half--right\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" tooltip=\"{{attendingUser.displayName}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"inviteModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush weight--bold\">Invite Friends</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\" ng-show=\"items.length\">Select people to invite:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width nudge-half--bottom\" placeholder=\"Search users...\" ng-model=\"searchUsers\" ng-show=\"items.length\" />\n" +
    "\t\t<ul ng-show=\"items.length\" class=\"modal-user-list invite table full-width\">\n" +
    "\t        <li ng-repeat=\"user in filteredItems = (items | filter:{ displayName: searchUsers } | orderBy: 'displayName')\" class=\"tr full-width pointer\" ng-click=\"toggleInvitee(user._id)\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + user.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{user.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td eight-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<span class=\"weight--bold\" ng-bind=\"user.displayName\"></span>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<a href class=\"toggle-invitee\" ng-class=\"{invitee: isInvitee(user._id)}\">\n" +
    "\t        \t\t\t<i class=\"fa fa-check\"></i>\n" +
    "\t        \t\t</a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<h2 class=\"green text-center\" ng-show=\"!items.length\">No users left to invite!</h2>\n" +
    "\t\t<h2 class=\"blue text-center\" ng-show=\"!filteredItems.length\">No users match your search.</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer table\">\n" +
    "    \t<div class=\"td one-half vertical-align-middle text-left\">\n" +
    "    \t\t<span class=\"weight--bold red\" ng-bind=\"inviteError\"></span>\n" +
    "    \t</div>\n" +
    "    \t<div class=\"td one-half vertical-align-middle\">\n" +
    "        \t<button class=\"btn\" ng-click=\"sendInvites()\" ng-disabled=\"!invitees.length\">Send Invites</button>\n" +
    "        \t<button class=\"btn--muted\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"shareModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Share Event</h2>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"editModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush weight--bold\">Edit Event</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<form name=\"editForm\">\n" +
    "\t    \t<label class=\"muted delta block\" for=\"eventTitle\">Event Title</label>\n" +
    "\t    \t<input type=\"text\" name=\"eventTitle\" id=\"eventTitle\" ng-model=\"newEvent.title\" class=\"full-width nudge-quarter--top nudge-half--bottom\" required />\n" +
    "\n" +
    "\t    \t<div class=\"line nudge-half--bottom\">\n" +
    "\t    \t\t<div class=\"unit one-third soft-half--right\">\n" +
    "\t    \t\t\t<label class=\"muted delta block\" for=\"eventTitle\">Start Date</label>\n" +
    "\t    \t\t\t<input type=\"text\" name=\"eventTitle\" id=\"eventTitle\" ng-model=\"newEvent.startDate\" class=\"full-width nudge-quarter--top\" datepicker-popup=\"MM/dd/yyyy\" placeholder=\"9/30/2013\" is-open=\"datepickerOpened\" min=\"today\" show-weeks=\"false\" required />\n" +
    "\t    \t\t</div>\n" +
    "\t    \t\t<div class=\"unit one-third soft-quarter--sides\">\n" +
    "\t    \t\t\t<label class=\"muted delta block\" for=\"eventStartTime\">Start Time</label>\n" +
    "\t    \t\t\t<input type=\"text\" name=\"eventStartTime\" id=\"eventStartTime\" ng-model=\"newEvent.startTime\" class=\"full-width nudge-quarter--top\" placeholder=\"9:00pm\" time-autocomplete ng-pattern=\"/(^([0-9]|[0][0-9]|[1][0-2]):([0-5][0-9])(\\s{0,1})([AM|PM|am|pm]{2,2})$)|(^([0-9]|[1][0-9]|[2][0-3])(\\s{0,1})([AM|PM|am|pm]{2,2})$)/\" required />\n" +
    "\t    \t\t</div>\n" +
    "\t    \t\t<div class=\"unit one-third last-unit soft-half--left\">\n" +
    "\t    \t\t\t<label class=\"muted delta block\" for=\"eventEndTime\">End Time</label>\n" +
    "\t    \t\t\t<input type=\"text\" name=\"eventEndTime\" id=\"eventEndTime\" ng-model=\"newEvent.endTime\" class=\"full-width nudge-quarter--top\" placeholder=\"9:00pm\" time-autocomplete=\"{{newEvent.startTime}}\" ng-pattern=\"/(^([0-9]|[0][0-9]|[1][0-2]):([0-5][0-9])(\\s{0,1})([AM|PM|am|pm]{2,2})$)|(^([0-9]|[1][0-9]|[2][0-3])(\\s{0,1})([AM|PM|am|pm]{2,2})$)/\" />\n" +
    "\t    \t\t</div>\n" +
    "\t    \t</div>\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block\" for=\"eventLocation\">Location</label>\n" +
    "\t    \t<input type=\"text\" name=\"eventLocation\" id=\"eventLocation\" ng-model=\"newEvent.locationName\" class=\"foursquare full-width nudge-quarter--top nudge-half--bottom\" typeahead=\"venue.name for venue in venues | filter:$viewValue | limitTo:8\" typeahead-min-length=\"0\" ng-blur=\"checkLocation()\" required />\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block\" for=\"roomNumber\">Room Number</label>\n" +
    "\t    \t<input type=\"text\" name=\"roomNumber\" id=\"roomNumber\" ng-model=\"newEvent.roomNumber\" class=\"full-width nudge-quarter--top nudge-half--bottom\" />\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block\" for=\"eventDescription\">Event Description</label>\n" +
    "\t    \t<textarea name=\"eventDescription\" id=\"eventDescription\" ng-model=\"newEvent.description\" class=\"full-width medium nudge-quarter--top nudge-half--bottom\"></textarea>\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block\" for=\"eventTags\">Tags</label>\n" +
    "\t    \t<input type=\"text\" id=\"eventTags\" name=\"eventTags\" class=\"full-width nudge-quarter--top\" ui-select2=\"tagOptions\" ng-model=\"newEvent.tags\" placeholder=\"Enter up to 3 tags\" />\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block full-width clearfix nudge-half--top\">Picture <a href ng-show=\"newEvent.pictureUrl\" class=\"red epsilon float-right\" ng-click=\"removePicture()\">Remove Picture</a></label>\n" +
    "\t    \t<div class=\"event-img nudge-half--bottom\" ng-show=\"newEvent.pictureUrl\" ng-style=\"{'background-image': 'url(' + newEvent.pictureUrl + ')'}\"></div>\n" +
    "\t    \t<input class=\"full-width nudge-quarter--top\" ng-hide=\"newEvent.pictureUrl\" id=\"newImage\" name=\"newImage\" type=\"file\" accept=\"image/*\" image=\"newImage.image\" />\n" +
    "\t    \t<div class=\"event-img nudge-quarter--top nudge-half--bottom\" ng-show=\"newImage.image\" ng-style=\"{'background-image': 'url(' + newImage.image.url + ')'}\"></div>\n" +
    "\n" +
    "\t    \t<label class=\"muted delta block nudge-half--ends\">Privacy</label>\n" +
    "\t    \t<div class=\"dropdown nudge-half--bottom\">\n" +
    "\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t{{ eventPrivacy.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu\">\n" +
    "\t\t\t\t\t<li ng-repeat=\"option in privacyOptions\">\n" +
    "\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changePrivacy(option)\"></a>\n" +
    "\t\t\t\t\t</li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer table\">\n" +
    "    \t<div class=\"td one-half vertical-align-middle text-left\">\n" +
    "    \t\t<span class=\"weight--bold red\" ng-bind=\"editError\"></span>\n" +
    "    \t</div>\n" +
    "    \t<div class=\"td one-half vertical-align-middle\">\n" +
    "        \t<button class=\"btn\" ng-click=\"saveChanges()\" ng-disabled=\"editForm.$invalid\">Save Changes</button>\n" +
    "        \t<button class=\"btn--muted\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"deleteModal.html\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h2 class=\"flush\">Deleting This Event</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"weight--bold flush--top nudge-half--bottom\">Are you sure?</h3>\n" +
    "    \t<p>Once you click the button below, this event (and all associated activity) will be deleted fully and permanently. There will be no way to restore or retrieve the information.</p>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "    \t<button class=\"btn--red\" ng-click=\"deleteEvent()\">Delete Event</button>\n" +
    "    \t<button class=\"btn--muted\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/explore.html',
    "<div class=\"loading\" ng-show=\"loading\">\n" +
    "\t<h2 class=\"flush\" ng-show=\"loading && !gettingPosition\">Loading...</h2>\n" +
    "\t<h2 class=\"flush\" ng-show=\"gettingPosition\">Getting your location...</h2>\n" +
    "</div>\n" +
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height full-width\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Explore</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half text-right\">\n" +
    "\t\t\t\t<ng-switch-toggle-group theme=\"candy\" ng-model=\"currentView\" choices=\"viewOptions\" class=\"float-right\" style=\"display:none;\"></ng-switch-toggle-group>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-show=\"currentView == 'school'\">\n" +
    "\t<div class=\"text-center\" ng-show=\"!loading && !events.length\">\n" +
    "\t\t<h1 class=\"flush blue\">There are no upcoming events for your school yet!</h1>\n" +
    "\t\t<a href=\"/post\" class=\"btn nudge--top\">Post One</a>\n" +
    "\t</div>\n" +
    "\t<div class=\"table soft-half--ends full-width\" ng-hide=\"!loading && !events.length\">\n" +
    "\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t<div class=\"input-prepend\">\n" +
    "\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-search\"></i>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<input type=\"text\" class=\"search\" ng-model=\"searchEvents\" placeholder=\"Search events...\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"td one-half vertical-align-middle text-right\">\n" +
    "\t\t\t<div class=\"dropdown\">\n" +
    "\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t{{ currentSort.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu pull-right\" style=\"left:none !important;right:0;\">\n" +
    "\t\t\t\t\t<li ng-repeat=\"option in sortOptions\">\n" +
    "\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changeSort(option)\"></a>\n" +
    "\t\t\t\t\t</li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<hr ng-hide=\"!loading && !events.length\" />\n" +
    "\t<div class=\"text-center\" ng-show=\"!loading && !filteredEvents.length && events.length\">\n" +
    "\t\t<h2 class=\"flush blue\" ng-show=\"events.length >= 20\">No events match your search. Have you tried loading more?</h2>\n" +
    "\t\t<h2 class=\"flush blue\" ng-show=\"events.length < 20\">No events match your search.</h2>\n" +
    "\t</div>\n" +
    "\t<a href ng-click=\"addNew()\" class=\"btn full-width text-center\" ng-show=\"newEvents.length == 1 && !loading\">Show 1 New Event</a>\n" +
    "\t<a href ng-click=\"addNew()\" class=\"btn full-width text-center\" ng-show=\"newEvents.length > 1 && !loading\">Show {{ newEvents.length }} New Events</a>\n" +
    "\t<div class=\"line fade nudge--ends\" ng-repeat=\"event in filteredEvents = (events | filter:searchEvents | orderBy:currentSort.value)\">\n" +
    "\t\t<article ng-include=\"'templates/event.html'\"></article><!-- event end -->\n" +
    "\t</div>\n" +
    "\t<hr ng-show=\"events.length >= 20 && filteredEvents.length\" />\n" +
    "\t<a href ng-click=\"loadMore()\" class=\"btn full-width text-center\" ng-show=\"moreToLoadSchool && !loadingMore && !loading\">Load More</a>\n" +
    "\t<a href class=\"btn full-width text-center\" ng-show=\"loadingMore && !loading\">Loading more...</a>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-show=\"currentView == 'nearby'\">\n" +
    "\t<div class=\"text-center\" ng-show=\"!loading && !events.length\">\n" +
    "\t\t<h1 class=\"flush blue\">There are no upcoming events near you yet!</h1>\n" +
    "\t\t<a href=\"/post\" class=\"btn nudge--top\">Post One</a>\n" +
    "\t</div>\n" +
    "\t<div class=\"text-center\" ng-show=\"showLocationError\">\n" +
    "\t\t<h1 class=\"flush blue\">We were unable to determine your location</h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"table soft-half--ends full-width\" ng-hide=\"!loading && !events.length\">\n" +
    "\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t<div class=\"input-prepend\">\n" +
    "\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-search\"></i>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<input type=\"text\" class=\"search\" ng-model=\"searchEvents\" placeholder=\"Search events...\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"td one-half vertical-align-middle text-right\">\n" +
    "\t\t\t<div class=\"dropdown\">\n" +
    "\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t{{ currentSort.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu pull-right\" style=\"left:none !important;right:0;\">\n" +
    "\t\t\t\t\t<li ng-repeat=\"option in sortOptions\">\n" +
    "\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changeSort(option)\"></a>\n" +
    "\t\t\t\t\t</li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<hr ng-hide=\"!loading && !events.length\" />\n" +
    "\t<div class=\"line fade nudge--ends\" ng-repeat=\"event in filteredEvents = (events | filter:searchEvents | orderBy:currentSort.value)\">\n" +
    "\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + event.creator.pictureUrl + ')'}\" ng-show=\"event.creator\">\n" +
    "\t\t\t\t<a href tooltip=\"{{event.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{event.creator.username}}\"></a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit eleven-twelfths last-unit\" ng-include=\"'templates/event.html'\"></div>\n" +
    "\t</div><!-- event end -->\n" +
    "\t<hr ng-show=\"events.length >= 20 && filteredEvents.length\" />\n" +
    "\t<a href ng-click=\"loadMore()\" class=\"btn full-width text-center\" ng-show=\"moreToLoadNearby && !loadingMore && !loading\">Load More</a>\n" +
    "\t<a href class=\"btn full-width text-center\" ng-show=\"loadingMore && !loading\">Loading more...</a>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"attendingModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Attending</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<ul ng-show=\"items.length\" class=\"modal-user-list table full-width\">\n" +
    "\t        <li ng-repeat=\"attendingUser in items\" class=\"tr full-width\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td nine-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\" class=\"weight--bold\" ng-bind=\"attendingUser.displayName\"></a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<div ng-hide=\"items.length\">\n" +
    "\t\t\t<h2 class=\"flush green text-center\">No one has RSVPd to this event yet!</h2>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"shareModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Share Event</h2>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/feed.html',
    "<div class=\"loading\" ng-show=\"loading\">\n" +
    "\t<h2 class=\"flush\">Loading...</h2>\n" +
    "</div>\n" +
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height full-width\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">My Feed</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td vertical-align-middle one-half text-right\">\n" +
    "\t\t\t\t<ng-switch-toggle-group theme=\"candy\" ng-model=\"currentView\" choices=\"viewOptions\" class=\"float-right\"></ng-switch-toggle-group>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-show=\"!loading\">\n" +
    "\t<div class=\"fade\" ng-show=\"currentView == 'actions'\" ng-repeat=\"activity in actionActivities | orderBy:'-timestamp'\">\n" +
    "\t\t<div ng-show=\"activity.activity == 'subscribed'\" class=\"soft-half--ends\">\n" +
    "\t\t\t<div class=\"table full-width\">\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-twelfth\">\n" +
    "\t\t\t\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + activity.actor.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t\t<a tooltip=\"{{activity.actor.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{activity.actor.username}}\"></a>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td eleven-twelfths vertical-align-middle\">\n" +
    "\t\t\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t\t\t\t\t\t<a ng-href=\"/profile/{{activity.actor.username}}\">{{activity.actor.displayName}}</a>\n" +
    "\t\t\t\t\t\t\t\t subscribed to\n" +
    "\t\t\t\t\t\t\t\t  <span ng-show=\"activity.recipient._id == user._id\" class=\"weight--bold\">you</span>\n" +
    "\t\t\t\t\t\t\t\t  <a ng-href=\"/profile/{{activity.recipient.username}}\" ng-hide=\"activity.recipient._id == user._id\">{{activity.recipient.displayName}}</a>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"unit one-fourth last-unit text-right\">\n" +
    "\t\t\t\t\t\t\t\t<span class=\"muted\">{{ activity.timestamp | timePast }}</span>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-show=\"activity.activity == 'invited'\" class=\"soft-half--ends\">\n" +
    "\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{activity.actor.username}}\">{{activity.actor.displayName}}</a>\n" +
    "\t\t\t\t\t invited you to:\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit one-fourth last-unit text-right\">\n" +
    "\t\t\t\t\t<span class=\"muted\">{{ activity.timestamp | timePast }}</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"line nudge-half--top\">\n" +
    "\t\t\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + activity.event.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a tooltip=\"{{activity.event.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{activity.event.creator.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t\t<div class=\"box\">\n" +
    "\t\t\t\t\t\t<div class=\"event-header soft-half--ends soft-quarter--sides\">\n" +
    "\t\t\t\t\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td three-fifths vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'public'\" tooltip=\"Public\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle-o nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'inviteOnly'\" tooltip=\"Invite Only\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<h3 class=\"flush\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a ng-href=\"/event/{{activity.event._id}}\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ activity.event.title }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</h3>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td two-fifths vertical-align-middle text-right\">\n" +
    "\t\t\t\t\t\t\t\t\tPosted by\n" +
    "\t\t\t\t\t\t\t\t\t <a ng-href=\"/profile/{{activity.event.creator.username}}\">{{activity.event.creator.displayName}}</a>\n" +
    "\t\t\t\t\t\t\t\t\t {{ activity.event.timestamp | timePast }}\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"islet\">\n" +
    "\t\t\t\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit full-width last-unit text-center\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"epsilon\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.locationName\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-map-marker muted\"></i> <span ng-bind=\"activity.event.locationName\"></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startDate\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar-o muted\"></i> <span>{{ activity.event.startDate | readableDate }}</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startTime\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-clock-o muted\"></i> <span ng-bind=\"activity.event.startTime\"></span> <span ng-show=\"activity.event.endTime\">- <span ng-bind=\"activity.event.endTime\"></span></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"line soft-half--ends\" ng-show=\"activity.event.description\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"muted epsilon fa fa-align-left\"></i>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit last-unit ninety-seven-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<p class=\"pre-wrap\" ng-show=\"activity.event.description\" ng-bind-html=\"activity.event.description | urlAndFormat | words:100:activity.event._id\"></p>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"event-footer table full-width soft-quarter--ends\">\n" +
    "\t\t\t\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td three-fifths\">\n" +
    "\t\t\t\t\t\t\t\t\t<ul class=\"tags\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<li ng-repeat=\"tag in activity.event.tags\" ng-bind=\"tag\"></li>\n" +
    "\t\t\t\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td two-fifths text-right soft-half--right vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a class=\"first\" ng-class=\"{green: isAttending(activity.event)}\" href tooltip=\"People Attending\"><span class=\"gamma\" ng-class=\"{green: isAttending(activity.event)}\">{{ activity.event.attending.length }}</span></a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"rsvpToEvent(activity)\" ng-hide=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-up\"></i> RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"unRsvpToEvent(activity)\" ng-show=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-o-up\"></i> Un-RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"openShare(activity.event)\" tooltip=\"Share\"><i class=\"fa fa-share-square\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons green\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-href=\"/event/{{activity.event._id}}\">Details <i class=\"fa fa-chevron-right epsilon\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div><!-- event end -->\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-show=\"activity.activity == 'rsvpd'\" class=\"soft-half--ends\">\n" +
    "\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{activity.actor.username}}\">{{activity.actor.displayName}}</a>\n" +
    "\t\t\t\t\t RSVP'd to an event:\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit one-fourth last-unit text-right\">\n" +
    "\t\t\t\t\t<span class=\"muted\">{{ activity.timestamp | timePast }}</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"line nudge-half--top\">\n" +
    "\t\t\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + activity.event.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a tooltip=\"{{activity.event.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{activity.event.creator.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t\t<div class=\"box\">\n" +
    "\t\t\t\t\t\t<div class=\"event-header soft-half--ends soft-quarter--sides\">\n" +
    "\t\t\t\t\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td three-fifths vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'public'\" tooltip=\"Public\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle-o nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'inviteOnly'\" tooltip=\"Invite Only\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<h3 class=\"flush\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a ng-href=\"/event/{{activity.event._id}}\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ activity.event.title }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</h3>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td two-fifths vertical-align-middle text-right epsilon muted\">\n" +
    "\t\t\t\t\t\t\t\t\tPosted by\n" +
    "\t\t\t\t\t\t\t\t\t <a class=\"muted\" ng-href=\"/profile/{{activity.event.creator.username}}\">{{activity.event.creator.displayName}}</a>\n" +
    "\t\t\t\t\t\t\t\t\t {{ activity.event.timestamp | timePast }}\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"islet\">\n" +
    "\t\t\t\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit full-width last-unit text-center\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"epsilon\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.locationName\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-map-marker muted\"></i> <span ng-bind=\"activity.event.locationName\"></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startDate\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar-o muted\"></i> <span>{{ activity.event.startDate | readableDate }}</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startTime\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-clock-o muted\"></i> <span ng-bind=\"activity.event.startTime\"></span> <span ng-show=\"activity.event.endTime\">- <span ng-bind=\"activity.event.endTime\"></span></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"line soft-half--ends\" ng-show=\"activity.event.description\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"muted epsilon fa fa-align-left\"></i>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit last-unit ninety-seven-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<p class=\"pre-wrap\" ng-show=\"activity.event.description\" ng-bind-html=\"activity.event.description | urlAndFormat | words:100:activity.event._id\"></p>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"event-footer table full-width soft-quarter--ends\">\n" +
    "\t\t\t\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td three-fifths\">\n" +
    "\t\t\t\t\t\t\t\t\t<ul class=\"tags\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<li ng-repeat=\"tag in activity.event.tags\" ng-bind=\"tag\"></li>\n" +
    "\t\t\t\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td two-fifths text-right soft-half--right vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a class=\"first\" ng-class=\"{green: isAttending(activity.event)}\" href tooltip=\"People Attending\"><span class=\"gamma\" ng-class=\"{green: isAttending(activity.event)}\">{{ activity.event.attending.length }}</span></a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"rsvpToEvent(activity)\" ng-hide=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-up\"></i> RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"unRsvpToEvent(activity)\" ng-show=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-o-up\"></i> Un-RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"openShare(activity.event)\" tooltip=\"Share\"><i class=\"fa fa-share-square\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons green\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-href=\"/event/{{activity.event._id}}\">Details <i class=\"fa fa-chevron-right epsilon\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div><!-- event end -->\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-show=\"activity.activity == 'commented'\" class=\"soft-half--ends\">\n" +
    "\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{activity.actor.username}}\">{{activity.actor.displayName}}</a>\n" +
    "\t\t\t\t\t commented on the event <a ng-href=\"/event/{{activity.event._id}}\">{{activity.event.title}}</a>:\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit one-fourth last-unit text-right\">\n" +
    "\t\t\t\t\t<span class=\"muted\">{{ activity.timestamp | timePast }}</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"line nudge-half--top\">\n" +
    "\t\t\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + activity.comment.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a tooltip=\"{{activity.comment.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"profile/{{activity.comment.creator.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t\t<div class=\"box islet comment\">\n" +
    "\t\t\t\t\t\t<p class=\"nudge-half--bottom pre-wrap\" ng-bind-html=\"activity.comment.body | urlAndFormat\"></p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<hr />\n" +
    "\t</div>\n" +
    "\t<div class=\"fade\" ng-show=\"currentView == 'events'\" ng-repeat=\"activity in eventActivities | orderBy:'-timestamp'\">\n" +
    "\t\t<div class=\"soft-half--ends\">\n" +
    "\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{activity.actor.username}}\">{{activity.actor.displayName}}</a>\n" +
    "\t\t\t\t\t posted an event:\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit one-fourth last-unit text-right\">\n" +
    "\t\t\t\t\t<span class=\"muted\">{{ activity.timestamp | timePast }}</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"line nudge-half--top\">\n" +
    "\t\t\t\t<div class=\"unit one-twelfth\">\n" +
    "\t\t\t\t\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + activity.event.creator.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a tooltip=\"{{activity.event.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{activity.event.creator.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t\t<div class=\"box\">\n" +
    "\t\t\t\t\t\t<div class=\"event-header soft-half--ends soft-quarter--sides\">\n" +
    "\t\t\t\t\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td full-width vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'public'\" tooltip=\"Public\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"beta fa fa-circle-blank nudge-half--right float-left\" ng-show=\"activity.event.privacy == 'inviteOnly'\" tooltip=\"Invite Only\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t<h3 class=\"flush\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a ng-href=\"/event/{{activity.event._id}}\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ activity.event.title }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</h3>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"islet\">\n" +
    "\t\t\t\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit full-width last-unit text-center\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"epsilon\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.locationName\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-map-marker muted\"></i> <span ng-bind=\"activity.event.locationName\"></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startDate\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar-o muted\"></i> <span>{{ activity.event.startDate | readableDate }}</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t\t<span ng-show=\"activity.event.startTime\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-clock-o muted\"></i> <span ng-bind=\"activity.event.startTime\"></span> <span ng-show=\"activity.event.endTime\">- <span ng-bind=\"activity.event.endTime\"></span></span>\n" +
    "\t\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"line soft-half--ends\" ng-show=\"activity.event.description\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<i class=\"muted epsilon fa fa-align-left\"></i>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"unit last-unit ninety-seven-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<p class=\"pre-wrap\" ng-show=\"activity.event.description\" ng-bind-html=\"activity.event.description | urlAndFormat | words:100:activity.event._id\"></p>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"event-footer table full-width soft-quarter--ends\">\n" +
    "\t\t\t\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td three-fifths\">\n" +
    "\t\t\t\t\t\t\t\t\t<ul class=\"tags\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<li ng-repeat=\"tag in activity.event.tags\" ng-bind=\"tag\"></li>\n" +
    "\t\t\t\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td two-fifths text-right soft-half--right vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a class=\"first\" ng-class=\"{green: isAttending(activity.event)}\" href tooltip=\"People Attending\"><span class=\"gamma\" ng-class=\"{green: isAttending(activity.event)}\">{{ activity.event.attending.length }}</span></a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"rsvpToEvent(activity)\" ng-hide=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-up\"></i> RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"unRsvpToEvent(activity)\" ng-show=\"isAttending(activity.event)\"><i class=\"fa fa-thumbs-o-up\"></i> Un-RSVP</a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-click=\"openShare(activity.event)\" tooltip=\"Share\"><i class=\"fa fa-share-square\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"action-buttons green\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href ng-href=\"/event/{{activity.event._id}}\">Details <i class=\"fa fa-chevron-right epsilon\"></i></a>\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div><!-- event end -->\n" +
    "\t\t</div>\n" +
    "\t\t<hr />\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"currentView == 'events' && !eventActivities.length && !loading\">\n" +
    "\t\t<h2 class=\"flush green text-center\">None of your subscriptions have posted any events yet. Try subscribing to other users!</h2>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"currentView == 'actions' && !actionActivities.length && !loading\">\n" +
    "\t\t<h2 class=\"flush green text-center\">None of your subscriptions have performed any actions yet. Try subscribing to other users!</h2>\n" +
    "\t</div>\n" +
    "\t<a href ng-click=\"loadMore()\" class=\"btn full-width text-center\" ng-show=\"moreToLoad && !loadingMore && !loading\">Load More</a>\n" +
    "\t<a href class=\"btn full-width text-center\" ng-show=\"loadingMore && !loading\">Loading more...</a>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"attendingModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Attending</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<ul ng-show=\"items.length\" class=\"modal-user-list table full-width\">\n" +
    "\t        <li ng-repeat=\"attendingUser in items\" class=\"tr full-width\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td nine-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\" class=\"weight--bold\" ng-bind=\"attendingUser.displayName\"></a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<div ng-hide=\"items.length\">\n" +
    "\t\t\t<h2 class=\"flush green text-center\">No one has RSVPd to this event yet!</h2>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"shareModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Share Event</h2>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/forgot.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Forgotten Password</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"table full-width full-height__header\" ng-hide=\"emailSent\">\n" +
    "\t<div class=\"td full-height full-width vertical-align-middle text-center\">\n" +
    "\t\t<div class=\"box island inline-block text-left top-highlight\" style=\"max-width:500px;\">\n" +
    "\t\t\t<form name=\"passwordForm\" ng-submit=\"sendEmail()\">\n" +
    "\t\t\t\t<p class=\"nudge-half--bottom\">Enter your account's username in the space below. A link to reset your password will be sent to the email address associated with the account.</p>\n" +
    "\t\t\t\t<label for=\"username\" class=\"muted\">Username</label>\n" +
    "\t\t\t\t<div class=\"input-prepend full\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-user\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" id=\"username\" ng-model=\"username\" placeholder=\"your username\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<span class=\"block red weight--bold nudge--top\" ng-show=\"forgotError\" ng-bind=\"forgotError\"></span>\n" +
    "\t\t\t\t<input type=\"submit\" value=\"Send Link\" class=\"btn full-width nudge--top\" ng-disabled=\"passwordForm.$invalid\" />\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-show=\"emailSent\">\n" +
    "\t<h1 class=\"green flush\">Email Sent!</h1>\n" +
    "\t<p class=\"gamma nudge--top\">An email has been sent to the address associated with the username you provided. It will contain a link that you can use to reset your password.</p>\n" +
    "</div>"
  );


  $templateCache.put('partials/home.html',
    "<section class=\"top_section\">\n" +
    "\t<div id=\"dark_top\">\n" +
    "\t\t<div class=\"inside_container\">\n" +
    "\t\t\t<div class=\"section group\">\n" +
    "\t\t\t\t<div class=\"col span_12_of_12 flush--ends text-center\">\n" +
    "\t\t\t\t\t<img src=\"http://assets.campuslively.com/img/logo.png\" alt=\"Campuslively logo\" id=\"logo\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"section group\">\n" +
    "\t\t\t\t<div class=\"col span_12_of_12 flush--top\">\n" +
    "\t\t\t\t\t<div header-switcher=\"h1\">\n" +
    "\t\t\t\t\t\t<h2 class=\"huge flush white\" style=\"display:none\">Don't miss a thing</h2>\n" +
    "\t\t\t\t\t\t<h2 class=\"huge flush white\" style=\"display:none\">Increase attendance to your events</h2>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<h3 class=\"flush white\">An easy way to view and share everything going on around your campus.</h3>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"section group flush--bottom\">\n" +
    "\t\t\t\t<div class=\"col span_6_of_12 responsive_right\">\n" +
    "\t\t\t\t\t<a href=\"/login\" title=\"Log In\" class=\"btn--blue\">Log In</a>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"col span_6_of_12 responsive_left\">\n" +
    "\t\t\t\t\t<a href=\"/register\" title=\"Sign Up\" class=\"btn--green\">Sign Up</a>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"section group flush--top\">\n" +
    "\t\t\t\t<div class=\"col span_12_of_12 text-center flush--bottom\">\n" +
    "\t\t\t\t\t<h3 class=\"flush white soft--ends\">Currently available at these schools:</h3>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div id=\"white_top\">\n" +
    "\t</div>\n" +
    "\t<div id=\"schools\" class=\"full-width\">\n" +
    "\t\t<div class=\"section group\">\n" +
    "\t\t\t<div class=\"col span_3_of_12\">\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_3_of_12\">\n" +
    "\t\t\t\t<div class=\"school-img center-block\" style=\"background-image: url('http://assets.campuslively.com/img/bu.png')\"></div>\n" +
    "\t\t\t\t<h3 class=\"text-center muted\">Boston University</h3>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_3_of_12\">\n" +
    "\t\t\t\t<div class=\"school-img center-block\" style=\"background-image: url('http://assets.campuslively.com/img/umaine.png')\"></div>\n" +
    "\t\t\t\t<h3 class=\"text-center muted\">University of Maine</h3>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_3_of_12\">\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"section group nudge--bottom\">\n" +
    "\t\t\t<div class=\"col span_12_of_12 flush--top flush--bottom\">\n" +
    "\t\t\t\t<a href=\"/contact\">Request Your School</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"section group\">\n" +
    "\t\t\t<div class=\"col span_12_of_12 text-center\">\n" +
    "\t\t\t\t<h2 class=\"flush blue\">You are a:</h2>\n" +
    "\t\t\t\t<ng-switch-toggle-group theme=\"candy\" ng-model=\"currentView\" choices=\"viewOptions\" style=\"display: inline-block !important;\"></ng-switch-toggle-group>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</section>\n" +
    "<section class=\"light_section soft--ends\" ng-show=\"currentView == 'student'\" style=\"background-image: url('http://assets.campuslively.com/img/students.png');\">\n" +
    "\t<div class=\"inside_container\">\n" +
    "\t\t<div class=\"section group soft--ends\">\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-lock\"></i> Only for your school</h3>\n" +
    "\t\t\t\t<p>Once registered and logged in, you can choose from a list of available schools. Once selected, you can view events specific to your school.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-refresh\"></i> Sync with your current apps</h3>\n" +
    "\t\t\t\t<p>Campuslively syncs with both your Facebook and Google Calendar. Connect with your friends from Facebook, and keep your Google Calendar in-sync with your events on campus.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-list\"></i> See everything happening on your campus</h3>\n" +
    "\t\t\t\t<p>Don’t miss out on a single event. Using the explore page, you will be able to search and find any event posted for your campus. No more having to search high and low to see what is going on at your school!</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"section group soft--ends\">\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-clock-o\"></i> View events as a live feed</h3>\n" +
    "\t\t\t\t<p>When you're not in the mood to search for something to do, use your feed to easily see what events are happening with the people and groups that matter to you most.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-calendar\"></i> Or view events as a calendar</h3>\n" +
    "\t\t\t\t<p>Planning ahead? View events as a calendar to easily plan what you are going to do in the coming weeks and months.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-plus\"></i> Easily post your own events</h3>\n" +
    "\t\t\t\t<p>As a student, you are also able to post your own events. On any page, you will see the clear “Post Event” button. Want to get the word out about a party or event you’re organizing? Post it to Campuslively!</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</section>\n" +
    "<section class=\"light_section soft--ends\" ng-show=\"currentView == 'group'\" style=\"background-image: url('http://assets.campuslively.com/img/marching_band.png');\">\n" +
    "\t<div class=\"inside_container\">\n" +
    "\t\t<div class=\"section group soft--ends\">\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-plus\"></i> Easily post your events</h3>\n" +
    "\t\t\t\t<p>Post an event in as little as 30 seconds! It's as simple as filling out one form and instantly reaching everyone at your school.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-thumbs-up\"></i> Reach your entire campus</h3>\n" +
    "\t\t\t\t<p>Campuslively is the only site that allows you to post your event to all students at your school. Make sure the maximum number of eyes see your event to increase awareness and attendance!</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-money\"></i> Save time and money</h3>\n" +
    "\t\t\t\t<p>Stop wasting time and money on fliers, posters, emails, and Facebook. Campuslively is the cheapest and most effective way to reach students at your school. With one click, thousands of students will have eyes on your event.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"section group soft--ends\">\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-link\"></i> Automatically reach your current social media followers</h3>\n" +
    "\t\t\t\t<p>In addition to the new users you'll reach, we also offer the ability to instantly connect with your followers from other social media sites. This means you can maintain your current fanbase while continuing to grow with Campuslively!</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-bullhorn\"></i> Interact directly with your target audience</h3>\n" +
    "\t\t\t\t<p>Once you have registered as a Campuslively user, other users will be able to \"subscribe\" to you, allowing them to instantly get updates about your events. In addition, you can interact directly with your audience with quick comments and \"likes\" on the event details page!</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12 index_item soft--bottom\">\n" +
    "\t\t\t\t<h3><i class=\"fa fa-arrows-alt\"></i> Share across multiple platforms</h3>\n" +
    "\t\t\t\t<p>Once you have posted your event on Campuslively, sharing it to other platforms such as Facebook, Twitter, and email is as simple as a few clicks.</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</section>\n" +
    "<section class=\"dark_section\" id=\"dark_bottom\">\n" +
    "\t<div class=\"inside_container\">\n" +
    "\t\t<div class=\"section group\">\n" +
    "\t\t\t<div class=\"col span_1_of_12\">\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_4_of_12\">\n" +
    "\t\t\t\t<img src=\"http://assets.campuslively.com/img/phones.png\" alt=\"mobile devices\" class=\"phones\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_6_of_12\" id=\"get_mobile\">\n" +
    "\t\t\t\t<h1 id=\"white_header\">Coming soon to your mobile device!</h1>\n" +
    "\t\t\t\t<a href=\"/contact\" class=\"btn--green nudge-half--top\">Request It Sooner</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_1_of_12\">\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</section>\n" +
    "<footer>\n" +
    "\t<div class=\"inside_container\">\n" +
    "\t\t<div class=\"section group\">\n" +
    "\t\t\t<div class=\"col span_4_of_12 responsive-text-left\">\n" +
    "\t\t\t\t<span class=\"block weight--bold nudge-half--bottom\">Connect with us:</span>\n" +
    "\t\t\t\t<a href=\"http://www.twitter.com/campuslively\" target=\"_blank\" class=\"muted-link alpha nudge-half--right\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "\t\t\t\t<a href=\"http://www.facebook.com/campuslively\" target=\"_blank\" class=\"muted-link alpha nudge-half--right\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "\t\t\t\t<a href=\"http://www.linkedin.com/company/campuslively\" target=\"_blank\" class=\"muted-link alpha\"><i class=\"fa fa-linkedin\"></i></a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col span_8_of_12 responsive-text-right\">\n" +
    "\t\t\t\t<span>Copyright &copy; 2012-{{currentYear}} Campuslively</span>\n" +
    "\t\t\t\t<ul class=\"nudge--top\">\n" +
    "\t\t\t\t\t<li><a href=\"/login\">Login</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"/register\">Sign Up</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"/privacy\">Privacy</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"/about\">About</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"/press\">Press</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"/contact\">Contact</a></li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</footer>\n"
  );


  $templateCache.put('partials/inner.html',
    "<nav class=\"sidebar\" fixed-sidebar>\n" +
    "\t<ul ng-show=\"isCurrentPage('/login') || isCurrentPage('/register') || isCurrentPage('/forgot')\">\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/login')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-sign-in\"></i>\n" +
    "\t\t\t\t<span>Login</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/register')\">\n" +
    "\t\t\t<a href=\"/register\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-pencil\"></i>\n" +
    "\t\t\t\t<span>Register</span>\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/forgot')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-question\"></i>\n" +
    "\t\t\t\t<span>Forgot</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<div class=\"bottom\">\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href=\"/\" class=\"link\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-home\"></i>\n" +
    "\t\t\t\t\t<span>Home</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t</div>\n" +
    "\t</ul>\n" +
    "\t<ul ng-show=\"(isCurrentPage('/privacy') || isCurrentPage('/contact')) || isCurrentPage('/about') || isCurrentPage('/press')\">\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/privacy')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-question\"></i>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/contact')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-envelope\"></i>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/about')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-users\"></i>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<li class=\"solo\" ng-show=\"isCurrentPage('/press')\">\n" +
    "\t\t\t<div class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-microphone\"></i>\n" +
    "\t\t\t</div>\n" +
    "\t\t</li>\n" +
    "\t\t<div class=\"bottom\">\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href=\"/\" class=\"link\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-home\"></i>\n" +
    "\t\t\t\t\t<span>Home</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t</div>\n" +
    "\t</ul>\n" +
    "\t<ul ng-hide=\"isCurrentPage('/login') || isCurrentPage('/register') || isCurrentPage('/forgot') || isCurrentPage('/reset') || isCurrentPage('/activate') || (isCurrentPage('/privacy') || isCurrentPage('/contact')) || isCurrentPage('/about') || isCurrentPage('/press') || !isLoggedIn()\">\n" +
    "\t\t<li class=\"post\" ng-class=\"{true:'active', false:''}[isCurrentPage('/post')]\">\n" +
    "\t\t\t<a href=\"/post\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-plus\"></i>\n" +
    "\t\t\t\t<span>Post</span>\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<li ng-class=\"{true:'active', false:''}[isCurrentPage('/feed')]\">\n" +
    "\t\t\t<a href=\"/feed\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-list\"></i>\n" +
    "\t\t\t\t<span>My Feed</span>\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<li ng-class=\"{true:'active', false:''}[isCurrentPage('/explore')]\">\n" +
    "\t\t\t<a href=\"/explore\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-compass\"></i>\n" +
    "\t\t\t\t<span>Explore</span>\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<li ng-class=\"{true:'active', false:''}[isCurrentPage('/calendar')]\">\n" +
    "\t\t\t<a href=\"/calendar\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-calendar-o\"></i>\n" +
    "\t\t\t\t<span>Calendar</span>\t\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<li ng-class=\"{true:'active', false:''}[isCurrentPage('/profile/{{user.username}}')]\">\n" +
    "\t\t\t<a ng-href=\"/profile/{{user.username}}\" class=\"link\">\n" +
    "\t\t\t\t<i class=\"fa fa-user\"></i>\n" +
    "\t\t\t\t<span>Profile</span>\t\t\n" +
    "\t\t\t</a>\n" +
    "\t\t</li>\n" +
    "\t\t<div class=\"bottom\">\n" +
    "\t\t\t<li ng-class=\"{true:'active', false:''}[isCurrentPage('/settings')]\">\n" +
    "\t\t\t\t<a href=\"/settings\" class=\"link\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-cogs\"></i>\n" +
    "\t\t\t\t\t<span>Settings</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href ng-click=\"logout()\" class=\"link\">\n" +
    "\t\t\t\t\t<i class=\"fa fa-sign-out\"></i>\n" +
    "\t\t\t\t\t<span>Sign Out</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t</div>\n" +
    "\t</ul>\n" +
    "</nav>\n" +
    "<div style=\"position:fixed;bottom:10px;right:10px;z-index:999;\">\n" +
    "\t<alert ng-repeat=\"notification in notifications\" close=\"closeNotification($index)\">\n" +
    "\t\t<p ng-bind-html=\"notification.msg\"></p>\n" +
    "\t</alert>\n" +
    "</div>\n" +
    "<section class=\"main full-height\" ui-view></section>"
  );


  $templateCache.put('partials/login.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Login to Campuslively</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"table full-width full-height__header\">\n" +
    "\t<div class=\"td vertical-align-middle text-center\">\n" +
    "\t\t<div class=\"box island inline-block text-left top-highlight\" style=\"width: 425px;\">\n" +
    "\t\t\t<img src=\"http://assets.campuslively.com/img/logo.png\" alt=\"Campuslively logo\" style=\"width: 250px;\" class=\"center-block\" />\n" +
    "\t\t\t<form name=\"loginForm\" ng-submit=\"login()\" class=\"nudge-half--ends\">\n" +
    "\t\t\t\t<label for=\"username\" class=\"muted\">Username</label>\n" +
    "\t\t\t\t<div class=\"input-prepend full nudge--bottom\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-user\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" id=\"username\" ng-model=\"username\" placeholder=\"username\" required autofocus />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<label for=\"password\" class=\"muted\">Password</label>\n" +
    "\t\t\t\t<div class=\"input-prepend full nudge--bottom\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-lock\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"password\" id=\"password\" ng-model=\"password\" placeholder=\"password\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<span class=\"block red weight--bold nudge--bottom\" ng-show=\"loginError && !showResend\" ng-bind=\"loginError\"></span>\n" +
    "\t\t\t\t<span class=\"block red weight--bold nudge--bottom\" ng-show=\"showResend && !emailResent\">Account has not been activated. <a href ng-click=\"resendActivation(username)\">Resend activation email</a></span>\n" +
    "\t\t\t\t<span class=\"block green weight--bold nudge--bottom\" ng-show=\"emailResent\">Your activation email has been resent.</span>\n" +
    "\t\t\t\t<input type=\"submit\" value=\"Login\" class=\"btn full-width\" ng-disabled=\"loginForm.$invalid\" />\n" +
    "\t\t\t</form>\n" +
    "\t\t\t<a href=\"/forgot\" class=\"block epsilon\">Forgot your password?</a>\n" +
    "\t\t\t<a href=\"/register\" class=\"block epsilon nudge-quarter--top\">Not registered yet?</a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/post.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height full-width\">\n" +
    "\t\t\t<div class=\"td four-fifths vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\" ng-hide=\"eventPosted\">Post An Event</h1>\n" +
    "\t\t\t\t<h1 class=\"flush blue\" ng-show=\"eventPosted\">Event Posted!</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td one-fifth vertical-align-middle text-right\">\n" +
    "\t\t\t\t<a ng-href=\"/event/{{postedEvent._id}}\" class=\"btn\" ng-show=\"eventPosted\">Go To Event <i class=\"fa fa-arrow-right\"></i></a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--top soft--bottom\">\n" +
    "\t<form name=\"eventForm\" ng-submit=\"postEvent()\" ng-hide=\"eventPosted\">\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"name\">Name <span class=\"red\">*</span></label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<input type=\"text\" id=\"name\" ng-model=\"event.title\" class=\"full-width\" placeholder=\"Event name\" required />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"details\">Details</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<textarea id=\"details\" ng-model=\"event.description\" class=\"full-width medium\" placeholder=\"Details about the event\"></textarea>\n" +
    "\t\t\t\t\t<span class=\"epsilon muted\">Bold text can be created by wrapping text in <strong>**double asterisks**</strong>. Italic text can be created by wrapping text in <em>//double front-slashes//</em>.</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"location\">Where <span class=\"red\">*</span></label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<div class=\"input-prepend full\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-building-o\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input class=\"foursquare\" type=\"text\" id=\"location\" ng-model=\"eventLocation\" placeholder=\"Location of event\" ng-required=\"!locationAddress\" typeahead=\"venue.name for venue in venues | filter:$viewValue | limitTo:8\" typeahead-min-length=\"0\" ng-blur=\"checkLocation()\" autocomplete=\"off\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\"></div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<span class=\"epsilon muted\">If the venue you're looking for doesn't appear, you can separately enter a new name and/or address.</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\" ng-show=\"showAddressInput\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\"></div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<div class=\"input-prepend full\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-map-marker\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"locationAddress\" ng-model=\"locationAddress\" placeholder=\"111 Road Name, City, State\" ng-blur=\"checkAddress()\" ng-required=\"!eventLocation\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"roomNumber\">Room #</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"roomNumber\" ng-model=\"event.roomNumber\" placeholder=\"123\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\"></div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<div ui-map=\"locationMap\" ui-options=\"mapOptions\" class=\"map\"></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"eventDate\">When <span class=\"red\">*</span></label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit three-twelfths soft--right\">\n" +
    "\t\t\t\t<div class=\"input-prepend full\">\n" +
    "\t\t\t\t\t<div class=\"icon pointer\" ng-click=\"openDatepicker()\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-calendar-o\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" id=\"eventDate\" datepicker-popup=\"MM/dd/yyyy\" ng-model=\"event.startDate\" name=\"eventDate\" placeholder=\"9/30/2013\" is-open=\"datepickerOpened\" min=\"today\" show-weeks=\"false\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit three-twelfths soft--right\">\n" +
    "\t\t\t\t<div class=\"input-prepend full\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-clock-o\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" id=\"startTime\" ng-model=\"event.startTime\" name=\"startTime\" placeholder=\"9:00pm\" time-autocomplete ng-pattern=\"/(^([0-9]|[0][0-9]|[1][0-2]):([0-5][0-9])(\\s{0,1})([AM|PM|am|pm]{2,2})$)|(^([0-9]|[1][0-9]|[2][0-3])(\\s{0,1})([AM|PM|am|pm]{2,2})$)/\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit three-twelfths soft--right\">\n" +
    "\t\t\t\t<div class=\"input-prepend full\" ng-show=\"event.startTime.length\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-clock-o\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"text\" id=\"endTime\" ng-model=\"event.endTime\" name=\"endTime\" placeholder=\"12:00am\" time-autocomplete=\"{{event.startTime}}\" ng-pattern=\"/(^([0-9]|[0][0-9]|[1][0-2]):([0-5][0-9])(\\s{0,1})([AM|PM|am|pm]{2,2})$)|(^([0-9]|[1][0-9]|[2][0-3])(\\s{0,1})([AM|PM|am|pm]{2,2})$)/\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit two-twelfths last-unit\"></div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"eventTags\">Tags</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<input type=\"text\" id=\"eventTags\" name=\"eventTags\" class=\"full-width\" ui-select2=\"tagOptions\" ng-model=\"event.tags\" placeholder=\"Enter up to 3 tags\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"eventImage\">Picture</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t\t\t\t<input class=\"full-width\" id=\"eventImage\" name=\"eventImage\" type=\"file\" accept=\"image/*\" image=\"eventImage\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"event-img nudge-half--bottom\" ng-show=\"eventImage\" ng-style=\"{'background-image': 'url(' + eventImage.url + ')'}\"></div>\n" +
    "\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container\">\n" +
    "\t\t\t\t<label for=\"private\">Privacy</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit five-twelfths label-container\">\n" +
    "\t\t\t\t<div class=\"dropdown\">\n" +
    "\t\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t\t{{ eventPrivacy.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t<ul class=\"dropdown-menu\">\n" +
    "\t\t\t\t\t\t<li ng-repeat=\"option in privacyOptions\">\n" +
    "\t\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changePrivacy(option)\"></a>\n" +
    "\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t</ul>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit five-twelfths label-container text-right\" ng-show=\"user.admin == true\">\n" +
    "\t\t\t\t<label for=\"anonymous\">Post Anonymously</label>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-twelfth label-container text-right last-unit\" ng-show=\"user.admin == true\">\n" +
    "\t\t\t\t<input type=\"checkbox\" id=\"anonymous\" name=\"anonymous\" ng-model=\"anonymous\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit full-width last-unit\">\n" +
    "\t\t\t    <span class=\"red weight--bold nudge-half--bottom\" ng-show=\"eventForm.startTime.$error.pattern\">Not a valid time. Must be of format HH:MM(am/pm)</span>\n" +
    "\t\t\t    <span class=\"red weight--bold nudge-half--bottom\" ng-show=\"eventForm.endTime.$error.pattern\">Not a valid time. Must be of format HH:MM(am/pm)</span>\n" +
    "\t\t\t\t<span class=\"red weight--bold nudge-half--bottom\" ng-show=\"postError\" ng-bind=\"postError\"></span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit full-width last-unit text-right\">\n" +
    "\t\t\t\t<input type=\"submit\" class=\"btn\" value=\"Post Event\" ng-disabled=\"eventForm.$invalid\" />\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</form>\n" +
    "\t<div ng-show=\"eventPosted\" ng-controller=\"postedCtrl\">\n" +
    "\t\t<div ng-hide=\"invitesSent\">\n" +
    "\t\t\t<h2 class=\"flush green weight--bold\">Select people to invite:</h2>\n" +
    "\t\t\t<h2 class=\"blue text-center\" ng-show=\"loadingUsers\">Loading...</h2>\n" +
    "\t\t\t<input type=\"text\" class=\"full-width nudge-half--bottom\" placeholder=\"Search users...\" ng-model=\"searchUsers\" ng-show=\"users.length\" />\n" +
    "\t\t\t<div ng-repeat=\"user in filteredUsers = (users | filter: { displayName: searchUsers } | orderBy: 'displayName')\" class=\"inline-block islet\">\n" +
    "\t\t\t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + user.pictureUrl + ')'}\" ng-class=\"{invitee: isInvitee(user._id)}\">\n" +
    "\t\t\t\t\t<a href ng-click=\"toggleInvitee(user._id)\" tooltip=\"{{user.displayName}}\" tooltip-placement=\"bottom\"></a>\n" +
    "\t\t\t\t\t<div class=\"checkmark\"><i class=\"fa fa-check\"></i></a></div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<h2 class=\"blue text-center\" ng-show=\"!users.length && !loadingUsers\">No users left to invite!</h2>\n" +
    "\t\t\t<h2 class=\"blue text-center\" ng-show=\"!filteredUsers.length && !loadingUsers\">No users match your search.</h2>\n" +
    "\t\t\t<div class=\"text-right nudge-half--ends\">\n" +
    "\t\t\t\t<a href class=\"btn text-center\" ng-click=\"sendInvites()\" ng-disabled=\"!invitees.length\">Send Invites</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<h2 class=\"blue text-center\" ng-show=\"invitesSent\">Invites sent!</h2>\n" +
    "\t\t<h2 class=\"flush green weight--bold\">Share the event:</h2>\n" +
    "\t\t<h3 class=\"caps nudge-half--ends\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/press.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Press</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"table full-width\">\n" +
    "\t\t<div class=\"td one-sixth\">\n" +
    "\t\t\t<img src=\"http://assets.campuslively.com/img/BU-Master-Logo.png\" class=\"full-width\" />\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"td five-sixths vertical-align-middle soft--left\">\n" +
    "\t\t\t<a href=\"http://www.bu.edu/entrepreneurship/events/new-venture-competitions/pitch-pizza/\" target=\"_blank\"><h2 class=\"flush \">2014 Spring Pitch Pizza Competition Winners</h2></a>\n" +
    "\t\t\t<h3 class=\"flush\">February 7, 2014</h3>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/privacy.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Privacy Policy</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<h2 class=\"flush\">What information do we collect?</h2>\n" +
    "\t<p>\n" +
    "\tWe collect information from you when you register on our site or fill out a form.\n" +
    "\tWhen ordering or registering on our site, as appropriate, you may be asked to enter information about yourself. You may, however, visit parts of our site anonymously.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">What do we use your information for?</h2>\n" +
    "\t<p>\n" +
    "\tAny of the information we collect from you may be used in one of the following ways\n" +
    "\t<ul>\n" +
    "\t<li>\n" +
    "\tTo personalize your experience\n" +
    "\t(your information helps us to better respond to your individual needs)\n" +
    "\t</li>\n" +
    "\t<li>\n" +
    "\tTo improve our website\n" +
    "\t(we continually strive to improve our website offerings based on the information and feedback we receive from you)\n" +
    "\t</li>\n" +
    "\t<li>\n" +
    "\tTo improve customer service\n" +
    "\t(your information helps us to more effectively respond to your customer service requests and support needs)\n" +
    "\t</li>\n" +
    "\t</ul>\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">How do we protect your information?</h2>\n" +
    "\t<p>\n" +
    "\tWe implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Do we use cookies?</h2>\n" +
    "\t<p>\n" +
    "\tYes (Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information\n" +
    "\tWe use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Do we disclose any information to outside parties?</h2>\n" +
    "\t<p>\n" +
    "\tWe do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.\n" +
    "\t<h2 class=\"flush--bottom\">Third party links</h2>\n" +
    "\t<p>\n" +
    "\tOccasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">California Online Privacy Protection Act Compliance</h2>\n" +
    "\t<p>\n" +
    "\tBecause we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.\n" +
    "\tAs part of the California Online Privacy Protection Act, all users of our site may make any changes to their information at anytime by logging in and going to the 'Account Settings' page.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Childrens Online Privacy Protection Act Compliance</h2>\n" +
    "\t<p>\n" +
    "\tWe are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 18 years old or older.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Online Privacy Policy Only</h2>\n" +
    "\t<p>\n" +
    "\tThis online privacy policy applies only to information collected through our website and not to information collected offline.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Your Consent</h2>\n" +
    "\t<p>\n" +
    "\tBy using our site, you consent to our web site privacy policy.\n" +
    "\t</p>\n" +
    "\t<h2 class=\"flush--bottom\">Changes to our Privacy Policy</h2>\n" +
    "\t<p>\n" +
    "\tIf we decide to change our privacy policy, we will post those changes on this page.\n" +
    "\tThis policy was last modified on November 21, 2013\n" +
    "\t</p>\n" +
    "</div>"
  );


  $templateCache.put('partials/profile.html',
    "<div class=\"loading\" ng-show=\"loading\">\n" +
    "\t<h2 class=\"flush\">Loading events...</h2>\n" +
    "</div>\n" +
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td one-tenth vertical-align-middle soft-half--right\">\n" +
    "\t\t\t\t<div class=\"user-img-profile\" ng-style=\"{'background-image': 'url(' + profile.pictureUrl + ')'}\"></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td six-tenths vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush\" ng-bind=\"profile.displayName\"></h1>\n" +
    "\t\t\t\t<div class=\"normal-lh\">\n" +
    "\t\t\t\t\t<a href ng-click=\"openLocation(profile)\" tooltip=\"Location\" ng-show=\"profile.type == 'group' && profile.address\" class=\"icon-link\">\n" +
    "\t\t\t\t\t\t<i class=\"beta fa fa-map-marker nudge-half--right\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t<a ng-href=\"{{profile.website}}\" target=\"_blank\" tooltip=\"Website\" ng-show=\"profile.type == 'group' && profile.website\" class=\"icon-link\">\n" +
    "\t\t\t\t\t\t<i class=\"beta fa fa-paperclip nudge-half--right\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t<a ng-href=\"http://www.twitter.com/{{profile.twitterLink}}\" target=\"_blank\" tooltip=\"Twitter\" ng-show=\"profile.twitterLink\" class=\"icon-link\">\n" +
    "\t\t\t\t\t\t<i class=\"beta fa fa-twitter nudge-half--right\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t<a ng-href=\"http://www.facebook.com/{{profile.facebookLink}}\" target=\"_blank\" tooltip=\"Facebook\" ng-show=\"profile.facebookLink\" class=\"icon-link\">\n" +
    "\t\t\t\t\t\t<i class=\"beta fa fa-facebook nudge-half--right\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td two-tenths normal-lh vertical-align-middle text-right\">\n" +
    "\t\t\t\t<a href=\"/settings\" class=\"btn\" ng-show=\"profile._id == user._id\"><i class=\"fa fa-cogs\"></i> Settings</a>\n" +
    "\t\t\t\t<a href class=\"btn\" ng-click=\"toggleSubscribe()\" ng-hide=\"isSubscribed() || profile._id == user._id\"><i class=\"fa fa-star\"></i> Subscribe</a>\n" +
    "\t\t\t\t<a href class=\"btn\" ng-click=\"toggleSubscribe()\" ng-show=\"isSubscribed() && profile._id != user._id\"><i class=\"fa fa-star-o\"></i> Unsubscribe</a>\n" +
    "\t\t\t\t<a href ng-click=\"openSubscribers()\" class=\"epsilon muted block nudge-quarter--top\" ng-show=\"subscribers.length == 1\" ng-bind=\"subscribers.length + ' subscriber'\"></a>\n" +
    "\t\t\t\t<a href ng-click=\"openSubscribers()\" class=\"epsilon muted block nudge-quarter--top\" ng-show=\"subscribers.length > 1\" ng-bind=\"subscribers.length + ' subscribers'\"></a>\n" +
    "\t\t\t</div>\n" +
    "\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-hide=\"loading\">\n" +
    "\t<div class=\"box islet nudge-half--bottom\" ng-show=\"profile.type == 'group' && profile.groupDescription\">\n" +
    "\t\t<div class=\"line\">\n" +
    "\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t<i class=\"muted fa fa-align-left\"></i>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit ninety-seven-percent last-unit\">\n" +
    "\t\t\t\t<p class=\"pre-wrap\" ng-bind-html=\"profile.groupDescription | urlAndFormat\"></p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<carousel interval=\"5000\" class=\"flush nudge-half--top\" ng-show=\"profile.businessPictureUrls\">\n" +
    "\t\t\t<slide ng-repeat=\"slide in profile.businessPictureUrls\" active=\"slide.active\">\n" +
    "\t\t\t\t<img ng-src=\"{{slide}}\" style=\"margin:auto;\">\n" +
    "\t\t\t</slide>\n" +
    "\t\t</carousel>\n" +
    "\t</div>\n" +
    "\t<div class=\"table full-width\" ng-show=\"events.length\">\n" +
    "\t\t<div class=\"tr\">\n" +
    "\t\t\t<div class=\"td one-half vertical-align-middle\">\n" +
    "\t\t\t\t<h2 class=\"flush\">Posted Events</h2>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"td one-half vertical-align-middle text-right\">\n" +
    "\t\t\t\t<div class=\"dropdown\">\n" +
    "\t\t\t\t\t<a href class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t\t{{ currentSort.label }} <i class=\"fa fa-chevron-down muted weight--normal\"></i>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t<ul class=\"dropdown-menu pull-right\" style=\"left:none !important;right:0;\">\n" +
    "\t\t\t\t\t\t<li ng-repeat=\"option in sortOptions\">\n" +
    "\t\t\t\t\t\t\t<a href ng-bind=\"option.label\" ng-click=\"changeSort(option)\"></a>\n" +
    "\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t</ul>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<hr ng-show=\"events.length\" />\n" +
    "\t<div class=\"line fade nudge--ends\" ng-repeat=\"event in events | orderBy:currentSort.value\">\n" +
    "\t\t<article ng-include=\"'templates/event.html'\"></article>\n" +
    "\t</div><!-- event end -->\n" +
    "\t<a href ng-click=\"loadMore()\" class=\"btn full-width text-center\" ng-show=\"moreToLoad && !loadingMore && !loading\">Load More</a>\n" +
    "\t<a href class=\"btn full-width text-center\" ng-show=\"loadingMore && !loading\">Loading more...</a>\n" +
    "\t<div class=\"text-center\" ng-hide=\"events.length\">\n" +
    "\t\t<h1 class=\"flush blue\" ng-show=\"profile._id !== user._id\"><span ng-bind=\"profile.displayName\"></span> has no upcoming events yet!</h1>\n" +
    "\t\t<div ng-show=\"profile._id == user._id\">\n" +
    "\t\t\t<h1 class=\"flush blue\">You haven't posted any upcoming events yet!</h1>\n" +
    "\t\t\t<a href=\"/post\" class=\"btn nudge--top\">Post Event</a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"attendingModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Attending</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<ul ng-show=\"items.length\" class=\"modal-user-list table full-width\">\n" +
    "\t        <li ng-repeat=\"attendingUser in items\" class=\"tr full-width\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td nine-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\" class=\"weight--bold\" ng-bind=\"attendingUser.displayName\"></a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<div ng-hide=\"items.length\">\n" +
    "\t\t\t<h2 class=\"flush green text-center\">No one has RSVPd to this event yet!</h2>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"shareModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Share Event</h2>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"caps flush--top nudge-half--bottom\">Event URL:</h3>\n" +
    "    \t<input type=\"text\" class=\"full-width\" ng-model=\"eventUrl\" input-select readonly=\"readonly\" />\n" +
    "    \t<div class=\"line nudge--top\">\n" +
    "\t    \t<div class=\"unit one-third soft--right\">\n" +
    "\t        \t<a ng-click=\"openTweet()\" class=\"btn twitter full-width text-center\"><i class=\"fa fa-twitter\"></i> Tweet</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third soft-half--sides\">\n" +
    "\t\t\t\t<a href ng-click=\"shareEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Share</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"unit one-third last-unit soft--left\">\n" +
    "\t\t\t\t<a href ng-click=\"sendEvent()\" class=\"btn fb full-width text-center\"><i class=\"fa fa-facebook\"></i> Send</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"locationModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Location</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div ui-map=\"locationMap\" ui-options=\"mapOptions\" ui-event=\"{'map-tilesloaded': 'placeMarker(locationMap)'}\" class=\"map nudge--ends\"></div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"subscribersModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Subscribers</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<ul ng-show=\"items.length\" class=\"modal-user-list table full-width\">\n" +
    "\t        <li ng-repeat=\"attendingUser in items\" class=\"tr full-width\">\n" +
    "\t        \t<div class=\"td one-tenth vertical-align-middle\">\n" +
    "\t        \t\t<div class=\"user-img-modal\" ng-style=\"{'background-image': 'url(' + attendingUser.pictureUrl + ')'}\">\n" +
    "\t        \t\t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\"></a>\n" +
    "\t        \t\t</div>\n" +
    "\t        \t</div>\n" +
    "\t        \t<div class=\"td nine-tenths vertical-align-middle soft--left\">\n" +
    "\t        \t\t<a ng-href=\"profile/{{attendingUser.username}}\" ng-click=\"clickLink()\" class=\"weight--bold\" ng-bind=\"attendingUser.displayName\"></a>\n" +
    "\t        \t</div>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t\t<div ng-hide=\"items.length\">\n" +
    "\t\t\t<h2 class=\"flush green text-center\">No one has RSVPd to this event yet!</h2>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/register-group.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Register for Campuslively: Club/Group</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"line\" ng-hide=\"emailSent\">\n" +
    "\t\t<div class=\"unit six-tenths\">\n" +
    "\t\t\t<form name=\"registerForm\" ng-submit=\"register(user)\">\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"username\">Username <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" id=\"username\" name=\"username\" ng-model=\"user.username\" class=\"full-width\" placeholder=\"Account username\" ng-pattern=\"/^[a-zA-Z0-9.-]*$/\" ng-blur=\"checkUsername()\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"email\">Email <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"email\" id=\"email\" name=\"email\" ng-model=\"user.email\" class=\"full-width\" placeholder=\"Your email address\" ng-blur=\"checkEmail()\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"groupName\">Name <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit full-width last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" id=\"groupName\" name=\"groupName\" ng-model=\"user.groupName\" class=\"full-width\" placeholder=\"Your club or group name\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"groupDescription\">Description</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit full-width last-unit\">\n" +
    "\t\t\t\t\t\t<textarea id=\"groupDescription\" name=\"groupDescription\" ng-model=\"user.groupDescription\" class=\"full-width medium\" placeholder=\"Description of your club or group\"></textarea>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"school\">School <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<select class=\"full-width\" ui-select2 ng-model=\"user.school\" placeholder=\"Select your school\" required>\n" +
    "\t\t\t\t\t\t    <option value=\"\"></option>\n" +
    "\t\t\t\t\t\t    <option ng-repeat=\"school in schools\" value=\"{{school._id}}\">{{ school.name }}</option>\n" +
    "\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"password\">Password <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" id=\"password\" name=\"password\" ng-model=\"user.password\" class=\"full-width\" placeholder=\"Your password\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"password\">Confirm <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" id=\"confirmPassword\" ng-model=\"confirmPassword\" name=\"confirmPassword\" password-verify=\"user.password\" class=\"full-width\" placeholder=\"Confirm your password\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit full-width last-unit\">\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerForm.username.$error.pattern\">\n" +
    "\t\t\t\t\t\t\tYour username can only contain letters, numbers, periods, and dashes.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerForm.confirmPassword.$error.passwordVerify\">\n" +
    "\t\t\t\t\t\t\tPasswords do not match.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"usernameTaken\">\n" +
    "\t\t\t\t\t\t\tThat username is already taken.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"emailTaken\">\n" +
    "\t\t\t\t\t\t\tThat email address is already in use.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"block red weight--bold nudge-half--bottom\" ng-show=\"registerError\" ng-bind=\"registerError\"></span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent label-container soft--right\">\n" +
    "\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"acceptTerms\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit label-container soft--left\">\n" +
    "\t\t\t\t\t\t<span><span class=\"red\">*</span>I agree to the <a href ng-click=\"openTerms()\">Terms and Conditions</a>.</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit full-width text-right last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"submit\" class=\"btn\" value=\"Register\" ng-disabled=\"registerForm.$invalid || usernameTaken || !acceptTerms\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit four-tenths last-unit soft--left\">\n" +
    "\t\t\t<h2 class=\"flush nudge--bottom blue\">A new way to connect with your student audience.</h2>\n" +
    "\t\t\t<div class=\"table full-width\">\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-thumbs-up\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3 class=\"flush\">Automatically connect to your registered Facebook followers</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-book\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>Your events become visible to all students at your school</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-map-marker\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>Your events also become visible to all users near the venue</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-bullhorn\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>Interact directly with your target audience</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"emailSent\">\n" +
    "\t\t<h1 class=\"green flush\">Thank you for registering!</h1>\n" +
    "\t\t<p class=\"gamma nudge--ends\">An email has been sent to the email address you provided. There will be a link in the email that you must click to activate your account before you will be able to log in.</p>\n" +
    "\t\t<a href=\"/\" class=\"btn\">Front Page</a>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"termsModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Terms and Conditions</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <p class=\"nudge-half--bottom\">This Agreement was last modified on February 26, 2014.</p>\n" +
    "\n" +
    "\t\t<p>Please read these Terms and Conditions (\"Agreement\", \"Terms and Conditions\") carefully before using www.campuslively.com (\"the Site\") operated by Campuslively (\"us\", \"we\", or \"our\"). This Agreement sets forth the legally binding terms and conditions for your use of the Site at www.campuslively.com.</p>\n" +
    "\t\t<p>By accessing or using the Site in any manner, including, but not limited to, visiting or browsing the Site or contributing content or other materials to the Site, you agree to be bound by these Terms and Conditions. Capitalized terms are defined in this Agreement.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Intellectual Property</h3>\n" +
    "\t\t<p>The Site and its original content, features and functionality are owned by Campuslively and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Termination</h3>\n" +
    "\t\t<p>We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Links to Other Sites</h3>\n" +
    "\t\t<p>Our Site may contain links to third-party sites that are not owned or controlled by Campuslively.</p>\n" +
    "\t\t<p>Campuslively has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party sites or services. We strongly advise you to read the terms and conditions and privacy policy of any third-party site that you visit.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Governing Law</h3>\n" +
    "\t\t<p>This Agreement (and any further rules, polices, or guidelines incorporated by reference) shall be governed and construed in accordance with the laws of Massachusetts, United States, without giving effect to any principles of conflicts of law.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Changes to This Agreement</h3>\n" +
    "\t\t<p>We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.</p>\n" +
    "\t\t<p>Please review this Agreement periodically for changes. If you do not agree to any of this Agreement or any changes to this Agreement, do not use, access or continue to access the Site or discontinue any use of the Site immediately.</p>\n" +
    "\n" +
    "\t\t<p class=\"nudge-half--top\">If you have any questions about this Agreement, please <a href=\"/contact\" ng-click=\"clickLink()\">contact us.</a></p>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/register-student.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Register for Campuslively: Student</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"line\" ng-hide=\"emailSent\">\n" +
    "\t\t<div class=\"unit six-tenths\">\n" +
    "\t\t\t<form name=\"registerForm\" ng-submit=\"register(user)\">\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"username\">Username <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" id=\"username\" name=\"username\" ng-model=\"user.username\" class=\"full-width\" placeholder=\"Account username\" ng-pattern=\"/^[a-zA-Z0-9.-]*$/\" ng-blur=\"checkUsername()\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"email\">Email <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"email\" id=\"email\" name=\"email\" ng-model=\"user.email\" ng-pattern=\"/([a-z0-9][-a-z0-9_\\+\\.]*[a-z0-9])@([a-z0-9][-a-z0-9\\.]*[a-z0-9]\\.(edu)|([0-9]{1,3}\\.{3}[0-9]{1,3}))/\" class=\"full-width\" placeholder=\"Your .edu email address\" ng-blur=\"checkEmail()\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"firstName\">First Name <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit three-tenths\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" id=\"firstName\" ng-model=\"user.firstName\" class=\"full-width\" placeholder=\"First Name\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container text-right soft-quarter--right\">\n" +
    "\t\t\t\t\t\t<label for=\"lastName\">Last Name <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit three-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" id=\"lastName\" ng-model=\"user.lastName\" class=\"full-width\" placeholder=\"Last Name\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"gender\">Gender <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<div class=\"table full-width\">\n" +
    "\t\t\t\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td vertical-align-middle three-percent\">\n" +
    "\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"gender\" ng-model=\"user.gender\" value=\"male\" />\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td vertical-align-middle one-twelfth\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"soft-half--left\">Male</span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td vertical-align-middle three-percent soft--left\">\n" +
    "\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"gender\" ng-model=\"user.gender\" value=\"female\" /> \n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t\t\t\t\t\t<span class=\"soft-half--left\">Female</span>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"school\">School <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<select class=\"full-width\" ui-select2 ng-model=\"user.school\" placeholder=\"Select your school\" required>\n" +
    "\t\t\t\t\t\t    <option value=\"\"></option>\n" +
    "\t\t\t\t\t\t    <option ng-repeat=\"school in schools\" value=\"{{school._id}}\">{{ school.name }}</option>\n" +
    "\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"password\">Password <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" id=\"password\" ng-model=\"user.password\" name=\"password\" class=\"full-width\" placeholder=\"Your password\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"password\">Confirm <span class=\"red\">*</span></label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit eight-tenths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" id=\"confirmPassword\" ng-model=\"confirmPassword\" name=\"confirmPassword\" password-verify=\"user.password\" class=\"full-width\" placeholder=\"Confirm your password\" required />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit full-width last-unit\">\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerForm.username.$error.pattern\">\n" +
    "\t\t\t\t\t\t\tUsername can only contain letters, numbers, periods, and dashes.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerForm.email.$error.pattern && !registerForm.username.$error.pattern\">\n" +
    "\t\t\t\t\t\t\tYour email address must end in .edu.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"usernameTaken\">\n" +
    "\t\t\t\t\t\t\tThat username is already taken.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"emailTaken\">\n" +
    "\t\t\t\t\t\t\tThat email address is already in use.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerForm.confirmPassword.$error.passwordVerify\">\n" +
    "\t\t\t\t\t\t\tPasswords do not match.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"registerError\" ng-bind=\"registerError\"></span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit three-percent label-container soft--right\">\n" +
    "\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"acceptTerms\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ninety-seven-percent last-unit label-container soft--left\">\n" +
    "\t\t\t\t\t\t<span><span class=\"red\">*</span>I agree to the <a href ng-click=\"openTerms()\">Terms and Conditions</a>.</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit two-tenths text-right last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"submit\" class=\"btn\" value=\"Register\" ng-disabled=\"registerForm.$invalid || usernameTaken || emailTaken || !acceptTerms\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit four-tenths last-unit soft--left\">\n" +
    "\t\t\t<h2 class=\"flush nudge--bottom blue\">A new way to see what's going on around your school.</h2>\n" +
    "\t\t\t<div class=\"table full-width\">\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-plus\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>Easily post your own events</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-book\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3 class=\"flush\">View all events posted for your school</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h1 class=\"huge flush green\"><i class=\"fa fa-map-marker\"></i></h1>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>Even see all events around you</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t\t<div class=\"td one-tenth vertical-align-middle text-center\">\n" +
    "\t\t\t\t\t\t<h3 class=\"flush green\"><i class=\"fa fa-clock-o\"></i> <i class=\"fa fa-calendar-o\"></i></h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"td nine-tenths vertical-align-middle soft-half--left\">\n" +
    "\t\t\t\t\t\t<h3>View them as a live feed, or further into the future</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"emailSent\">\n" +
    "\t\t<h1 class=\"green flush\">Thank you for registering!</h1>\n" +
    "\t\t<p class=\"gamma nudge--ends\">An email has been sent to the .edu address you provided. There will be a link in the email that you must click to activate your account before you will be able to log in.</p>\n" +
    "\t\t<a href=\"/\" class=\"btn\">Front Page</a>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"termsModal.html\">\n" +
    "    <div class=\"modal-header clearfix\">\n" +
    "        <h3 class=\"flush float-left weight--bold\">Terms and Conditions</h3>\n" +
    "        <i class=\"fa fa-times close\" ng-click=\"ok()\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <p class=\"nudge-half--bottom\">This Agreement was last modified on February 26, 2014.</p>\n" +
    "\n" +
    "\t\t<p>Please read these Terms and Conditions (\"Agreement\", \"Terms and Conditions\") carefully before using www.campuslively.com (\"the Site\") operated by Campuslively (\"us\", \"we\", or \"our\"). This Agreement sets forth the legally binding terms and conditions for your use of the Site at www.campuslively.com.</p>\n" +
    "\t\t<p>By accessing or using the Site in any manner, including, but not limited to, visiting or browsing the Site or contributing content or other materials to the Site, you agree to be bound by these Terms and Conditions. Capitalized terms are defined in this Agreement.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Intellectual Property</h3>\n" +
    "\t\t<p>The Site and its original content, features and functionality are owned by Campuslively and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Termination</h3>\n" +
    "\t\t<p>We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Links to Other Sites</h3>\n" +
    "\t\t<p>Our Site may contain links to third-party sites that are not owned or controlled by Campuslively.</p>\n" +
    "\t\t<p>Campuslively has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party sites or services. We strongly advise you to read the terms and conditions and privacy policy of any third-party site that you visit.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Governing Law</h3>\n" +
    "\t\t<p>This Agreement (and any further rules, polices, or guidelines incorporated by reference) shall be governed and construed in accordance with the laws of Massachusetts, United States, without giving effect to any principles of conflicts of law.</p>\n" +
    "\n" +
    "\t\t<h3 class=\"weight--bold nudge-half--ends\">Changes to This Agreement</h3>\n" +
    "\t\t<p>We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.</p>\n" +
    "\t\t<p>Please review this Agreement periodically for changes. If you do not agree to any of this Agreement or any changes to this Agreement, do not use, access or continue to access the Site or discontinue any use of the Site immediately.</p>\n" +
    "\n" +
    "\t\t<p class=\"nudge-half--top\">If you have any questions about this Agreement, please <a href=\"/contact\" ng-click=\"clickLink()\">contact us.</a></p>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('partials/register.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Register for Campuslively</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"table full-width full-height__header\">\n" +
    "\t<div class=\"td full-height full-width vertical-align-middle text-center\">\n" +
    "\t\t<h2>What would you like to register as?</h2>\n" +
    "\t\t<div class=\"box inline-block text-left\">\n" +
    "\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t<a href=\"/register/student\" class=\"option\">\n" +
    "\t\t\t\t\t<h1 class=\"flush\"><i class=\"fa fa-user\"></i></h1>\n" +
    "\t\t\t\t\tStudent\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<a href=\"/register/group\" class=\"option\">\n" +
    "\t\t\t\t\t<h1 class=\"flush\"><i class=\"fa fa-users\"></i></h1>\n" +
    "\t\t\t\t\tClub/Group\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('partials/resend.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Activate Your Account</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<h1 class=\"green flush\">Email Resent</h1>\n" +
    "\t<p class=\"gamma nudge--ends\">An email containing the link to activate your account has been sent again to your email address.</p>\n" +
    "\t<a href=\"/login\" class=\"btn\">Log In</a>\n" +
    "</div>"
  );


  $templateCache.put('partials/reset.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Reset Your Password</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"table full-width full-height__header\" ng-hide=\"passwordChanged\">\n" +
    "\t<div class=\"td vertical-align-middle text-center\">\n" +
    "\t\t<div class=\"box island inline-block text-left top-highlight\" style=\"width:500px;\">\n" +
    "\t\t\t<form name=\"passwordForm\" ng-submit=\"changePassword()\">\n" +
    "\t\t\t\t<label for=\"password\" class=\"muted\">New Password</label>\n" +
    "\t\t\t\t<div class=\"input-prepend full nudge--bottom\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-lock\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"password\" id=\"password\" ng-model=\"password\" placeholder=\"your new password\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<label for=\"password\" class=\"muted\">Confirm New Password</label>\n" +
    "\t\t\t\t<div class=\"input-prepend full nudge--bottom\">\n" +
    "\t\t\t\t\t<div class=\"icon\">\n" +
    "\t\t\t\t\t\t<i class=\"fa fa-lock\"></i>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<input type=\"password\" id=\"confirmPassword\" ng-model=\"confirmPassword\" name=\"confirmPassword\" password-verify=\"password\" class=\"full-width\" placeholder=\"Confirm your new password\" required />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<span class=\"block nudge--ends red weight--bold\" ng-show=\"resetError\" ng-bind=\"resetError\"></span>\n" +
    "\t\t\t\t<span class=\"red weight--bold block nudge-half--bottom\" ng-show=\"passwordForm.confirmPassword.$error.passwordVerify\">\n" +
    "\t\t\t\t\tPasswords do not match.\n" +
    "\t\t\t\t</span>\n" +
    "\t\t\t\t<input type=\"submit\" value=\"Change Password\" class=\"btn full-width\" ng-disabled=\"passwordForm.$invalid\" />\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\" ng-show=\"passwordChanged\">\n" +
    "\t<h1 class=\"green flush\">Password Reset!</h1>\n" +
    "\t<p class=\"gamma nudge--ends\">Your password has been successfully reset.</p>\n" +
    "\t<a href=\"/login\" class=\"btn\">Log In</a>\n" +
    "</div>"
  );


  $templateCache.put('partials/settings.html',
    "<div class=\"white-top\">\n" +
    "\t<div class=\"container full-height\">\n" +
    "\t\t<div class=\"table full-height\">\n" +
    "\t\t\t<div class=\"td vertical-align-middle\">\n" +
    "\t\t\t\t<h1 class=\"flush blue\">Account Settings</h1>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"container soft-half--ends\">\n" +
    "\t<div class=\"line\">\n" +
    "\t\t<div class=\"unit three-fourths\">\n" +
    "\t\t\t<form name=\"settingsForm\" ng-submit=\"saveChanges()\" class=\"nudge-half--bottom\">\n" +
    "\t\t\t\t<div class=\"text-center nudge-half--bottom full-width\">\n" +
    "\t\t\t\t\t<div class=\"user-img-settings center-block\" ng-show=\"newUserImage\" ng-style=\"{'background-image': 'url(' + newUserImage.url + ')'}\">\n" +
    "\t\t\t\t\t\t<a ng-href=\"/profile/{{user.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"user-img-settings center-block\" ng-hide=\"newUserImage\" ng-style=\"{'background-image': 'url(' + user.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t\t<a ng-href=\"/profile/{{user.username}}\"></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userImage\">Picture</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit seven-twelfths\">\n" +
    "\t\t\t\t\t\t<input class=\"full-width\" id=\"newUserImage\" name=\"newUserImage\" type=\"file\" accept=\"image/*\" image=\"newUserImage\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit three-twelfths last-unit soft-half--left label-container\">\n" +
    "\t\t\t\t\t\t<a href ng-click=\"useFacebookImage()\" ng-show=\"user.facebook.id && !usingFacebookImage() && user.type == 'student'\" class=\"btn fb full-width\"><i class=\"fa fa-facebook\"></i> Use Facebook</a>\n" +
    "\t\t\t\t\t\t<select class=\"full-width\" ng-model=\"picturePage\" ng-show=\"user.facebook.managedPages.length && user.type =='group'\" ng-change=\"usePageForImage()\">\n" +
    "\t\t\t\t\t\t    <option value=\"\">Use a Facebook page</option>\n" +
    "\t\t\t\t\t\t    <option ng-repeat=\"page in user.facebook.managedPages\" value=\"{{page.id}}\">{{ page.name }}</option>\n" +
    "\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"school\">School</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<select class=\"full-width\" ui-select2=\"schoolSelectOptions\" ng-model=\"userSchool\" placeholder=\"Select your school\">\n" +
    "\t\t\t\t\t\t    <option value=\"\"></option>\n" +
    "\t\t\t\t\t\t    <option ng-repeat=\"school in schools\" value=\"{{school._id}}\">{{ school.name }}</option>\n" +
    "\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.type == 'student'\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userFirstName\">First</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit four-twelfths\">\n" +
    "\t\t\t\t\t\t<input class=\"full-width\" id=\"userFirstName\" name=\"userFirstName\" type=\"text\" ng-model=\"userFirstName\" placeholder=\"first name\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths soft-half--right text-right\">\n" +
    "\t\t\t\t\t\t<label for=\"userLastName\">Last</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit four-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input class=\"full-width\" id=\"userLastName\" name=\"userLastName\" type=\"text\" ng-model=\"userLastName\" placeholder=\"last name\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.type == 'group'\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userGroupName\">Name</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"userGroupName\" placeholder=\"Your club or group name\" ng-model=\"userGroupName\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.type == 'group'\" >\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userGroupDescription\">Description</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<textarea id=\"userGroupDescription\" name=\"userGroupDescription\" ng-model=\"userGroupDescription\" class=\"full-width medium\" placeholder=\"Description of your club or group\"></textarea>\n" +
    "\t\t\t\t\t\t<span class=\"epsilon muted\">Bold text can be created by wrapping text in <strong>**double asterisks**</strong>. Italic text can be created by wrapping text in <em>//double front-slashes//</em>.</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.type == 'group'\" >\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"locationAddress\">Address</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"locationAddress\" name=\"locationAddress\" ng-model=\"locationAddress\" placeholder=\"Address of your location\" ng-change=\"checkAddress()\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.type == 'group'\" >\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"websiteAddress\">Website</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"websiteAddress\" name=\"websiteAddress\" ng-model=\"websiteAddress\" placeholder=\"Your website address\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.facebook.managedPages.length && user.type == 'group'\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userFacebookLink\">Facebook</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit label-container\">\n" +
    "\t\t\t\t\t\t<select class=\"full-width\" id=\"userFacebookLink\" name=\"userFacebookLink\" ng-model=\"userFacebookLink\">\n" +
    "\t\t\t\t\t\t    <option value=\"\">Choose a Facebook page</option>\n" +
    "\t\t\t\t\t\t    <option ng-repeat=\"page in user.facebook.managedPages\" value=\"{{page.id}}\" ng-selected=\"page.id == userFacebookLink\">{{ page.name }}</option>\n" +
    "\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"!user.facebook.id\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userFacebookLink\">Facebook</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"userFacebookLink\" name=\"userFacebookLink\" ng-model=\"userFacebookLink\" placeholder=\"Your Facebook username\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userTwitterLink\">Twitter</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" id=\"userTwitterLink\" name=\"userTwitterLink\" ng-model=\"userTwitterLink\" placeholder=\"Your Twitter handle\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userEmail\">Email</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" name=\"emailGroup\" id=\"userEmail\" placeholder=\"email address\" ng-model=\"userEmailGroup\" ng-show=\"user.type == 'group'\" ng-blur=\"checkEmail()\" />\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"full-width\" name=\"emailStudent\" id=\"userEmail\" placeholder=\"email address\" ng-model=\"userEmailStudent\" ng-pattern=\"/([a-z0-9][-a-z0-9_\\+\\.]*[a-z0-9])@([a-z0-9][-a-z0-9\\.]*[a-z0-9]\\.(edu)|([0-9]{1,3}\\.{3}[0-9]{1,3}))/\" ng-show=\"user.type == 'student'\" ng-blur=\"checkEmail()\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit label-container two-twelfths\">\n" +
    "\t\t\t\t\t\t<label for=\"userPassword\">Password</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" class=\"full-width\" id=\"userPassword\" placeholder=\"New password\" ng-model=\"userPassword\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line nudge-half--bottom\">\n" +
    "\t\t\t\t\t<div class=\"unit two-twelfths label-container\">\n" +
    "\t\t\t\t\t\t<label for=\"password\">Confirm</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"unit ten-twelfths last-unit\">\n" +
    "\t\t\t\t\t\t<input type=\"password\" id=\"confirmPassword\" ng-model=\"confirmPassword\" name=\"confirmPassword\" password-verify=\"userPassword\" class=\"full-width\" placeholder=\"Confirm new password\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t\t<div class=\"unit full-width last-unit text-right\">\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold nudge--right\" ng-show=\"saveError\" ng-bind=\"saveError\"></span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold nudge--right\" ng-show=\"settingsForm.emailStudent.$error.pattern && settingsForm.emailStudent.length > 0\">\n" +
    "\t\t\t\t\t\t\tEmail address must end in .edu.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold nudge--right\" ng-show=\"emailTaken\">\n" +
    "\t\t\t\t\t\t\tThat email address is already in use.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span class=\"blue weight--bold nudge--right\" ng-show=\"changesSaved\">Changes saved!</span>\n" +
    "\t\t\t\t\t\t<span class=\"red weight--bold nudge--right\" ng-show=\"settingsForm.confirmPassword.$error.passwordVerify\">\n" +
    "\t\t\t\t\t\t\tPasswords do not match.\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<input type=\"submit\" class=\"btn\" value=\"Save Changes\" ng-disabled=\"settingsForm.$invalid || emailTaken\" />\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\n" +
    "\t\t\t<hr ng-show=\"user.subscriptions\" />\n" +
    "\n" +
    "\t\t\t<h2 class=\"flush soft-half--bottom\" ng-show=\"user.subscriptions\">Manage Subscriptions</h2>\n" +
    "\t\t\t<div class=\"inline-block\" ng-repeat=\"subscription in user.subscriptions\">\n" +
    "\t\t\t\t<div class=\"user-img-subscriptions\" ng-style=\"{'background-image': 'url(' + subscription.pictureUrl + ')'}\">\n" +
    "\t\t\t\t\t<a ng-href=\"/profile/{{subscription.username}}\" tooltip=\"{{subscription.displayName}}\" tooltip-placement=\"bottom\"></a>\n" +
    "\t\t\t\t\t<a href class=\"remove\" tooltip=\"Unsubscribe\" tooltip-placement=\"top\" ng-click=\"removeSubscription(subscription._id)\"><i class=\"fa fa-times\"></i></a>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\n" +
    "\t\t\t<hr />\n" +
    "\n" +
    "\t\t\t<a class=\"btn--muted float-right nudge-half--top\" href ng-click=\"openDelete()\">Delete Account</a>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"unit one-fourth soft--left last-unit\">\n" +
    "\t\t\t<a href ng-click=\"fbLogin()\" ng-hide=\"user.facebook.id\" class=\"btn fb full-width nudge-half--bottom\"><i class=\"fa fa-facebook\"></i> Add Facebook</a>\n" +
    "\t\t\t<a href ng-click=\"fbLogout()\" ng-show=\"user.facebook.id\" class=\"btn fb full-width nudge-half--bottom\"><i class=\"fa fa-facebook\"></i> Remove Facebook</a>\n" +
    "\t\t\t<div class=\"line nudge-half--bottom\" ng-show=\"user.facebook.id && user.type == 'student'\">\n" +
    "\t\t\t\t<div class=\"one-twelfth unit\">\n" +
    "\t\t\t\t\t<input type=\"checkbox\" ng-model=\"user.facebook.autoPost\" ng-change=\"changeFbAutoPost()\" id=\"autoPost\" name=\"autoPost\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"eleven-twelfths last-unit label-container soft-half--left\">\n" +
    "\t\t\t\t\t<label for=\"autoPost\">Autopost Activity</label> \n" +
    "\t\t\t\t\t<i class=\"fa fa-question-circle nudge-half--left pointer\" ng-click=\"openExplanation()\"></i>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<a href ng-click=\"googleLogin()\" ng-hide=\"user.google.id\" class=\"btn google full-width\"><i class=\"fa fa-google-plus\"></i> Add Google</a>\n" +
    "\t\t\t<a href ng-click=\"googleLogout()\" ng-show=\"user.google.id\" class=\"btn google full-width\"><i class=\"fa fa-google-plus\"></i> Remove Google</a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"explanationModal.html\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h2 class=\"flush\">Autopost Activity</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"weight--bold flush--top nudge-half--bottom\">What does this do?</h3>\n" +
    "    \t<p>Enabling this option will automatically post items to Facebook when you:</p>\n" +
    "    \t<ol>\n" +
    "    \t\t<li class=\"nudge-half--bottom\">Create a new public event</li>\n" +
    "    \t\t<li>RSVP to an existing public event</li>\n" +
    "    \t</ol>\n" +
    "    \t<p>Disabling this option means nothing will be posted to Facebook without you explicitly doing so.</p>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn\" ng-click=\"ok()\">Ok</button>\n" +
    "    </div>\n" +
    "</script>\n" +
    "<script type=\"text/ng-template\" id=\"deleteModal.html\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h2 class=\"flush\">Deleting Your Account</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "    \t<h3 class=\"weight--bold flush--top nudge-half--bottom\">Are you sure?</h3>\n" +
    "    \t<p>Once you click the button below, your account will be deleted fully and permanently. There will be no way to restore or retrieve your account. However, events and comments you have posted in the past will not be deleted.</p>\n" +
    "    \t<p class=\"nudge-half--top\">If you ever wish to use Campuslively again, you will have to create a new account.</p>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "    <button class=\"btn--red\" ng-click=\"deleteUser()\">Delete Account</button>\n" +
    "    \t<button class=\"btn--muted\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    </div>\n" +
    "</script>"
  );


  $templateCache.put('templates/accordion/accordion-group.html',
    "<div class=\"accordion-group\">\n" +
    "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a></div>\n" +
    "  <div class=\"accordion-body\" collapse=\"!isOpen\">\n" +
    "    <div class=\"accordion-inner\" ng-transclude></div>  </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/accordion/accordion.html',
    "<div class=\"accordion\" ng-transclude></div>"
  );


  $templateCache.put('templates/alert/alert.html',
    "<div class='alert'>\n" +
    "\t<button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
    "\t<div ng-transclude class=\"islet\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/carousel/carousel.html',
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">\n" +
    "    <ol class=\"carousel-indicators\" ng-show=\"slides().length > 1\">\n" +
    "        <li ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "    <a ng-click=\"prev()\" class=\"carousel-control left\" ng-show=\"slides().length > 1\">&lsaquo;</a>\n" +
    "    <a ng-click=\"next()\" class=\"carousel-control right\" ng-show=\"slides().length > 1\">&rsaquo;</a>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/carousel/slide.html',
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item\" ng-transclude></div>\n"
  );


  $templateCache.put('templates/datepicker/datepicker.html',
    "<table class=\"center-block\">\n" +
    "  <thead>\n" +
    "    <tr class=\"text-center\">\n" +
    "      <th><button type=\"button\" class=\"btn pull-left\" ng-click=\"move(-1)\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn--blue\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn pull-right\" ng-click=\"move(1)\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center soft-half--sides\" ng-show=\"labels.length > 0\">\n" +
    "      <th ng-repeat=\"label in labels\">{{label}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows\">\n" +
    "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn datepicker\" ng-class=\"{'btn': dt.selected, 'muted': dt.secondary}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{muted: dt.secondary}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n"
  );


  $templateCache.put('templates/datepicker/popup.html',
    "<ul class=\"dropdown-menu islet\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" class=\"dropdown-menu\">\n" +
    "\t<li ng-transclude></li>\n" +
    "\t<li class=\"divider\"></li>\n" +
    "\t<li style=\"nudge-half--top\">\n" +
    "\t\t<span class=\"btn-group\">\n" +
    "\t\t\t<button class=\"btn btn-small btn-inverse\" ng-click=\"today()\">Today</button>\n" +
    "\t\t</span>\n" +
    "\t\t<button class=\"btn--blue pull-right\" ng-click=\"isOpen = false\">Close</button>\n" +
    "\t</li>\n" +
    "</ul>"
  );


  $templateCache.put('templates/dialog/message.html',
    "<div class=\"modal-header\">\n" +
    "\t<h3>{{ title }}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\t<p>{{ message }}</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "\t<button ng-repeat=\"btn in buttons\" ng-click=\"close(btn.result)\" class=\"btn\" ng-class=\"btn.cssClass\">{{ btn.label }}</button>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/event.html',
    "<div class=\"unit one-twelfth text-center\">\n" +
    "\t<div class=\"user-img-event\" ng-style=\"{'background-image': 'url(' + event.creator.pictureUrl + ')'}\" ng-show=\"event.creator\">\n" +
    "\t\t<a href tooltip=\"{{event.creator.displayName}}\" tooltip-placement=\"left\" ng-href=\"/profile/{{event.creator.username}}\"></a>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"unit eleven-twelfths last-unit\">\n" +
    "\t<div class=\"box\">\n" +
    "\t\t<div class=\"event-header soft-half--ends soft-quarter--sides\">\n" +
    "\t\t\t<div class=\"table full-width full-height\">\n" +
    "\t\t\t\t<div class=\"td three-fifths vertical-align-middle\">\n" +
    "\t\t\t\t\t<i class=\"beta fa fa-circle nudge-half--right float-left\" ng-show=\"event.privacy == 'public'\" tooltip=\"Public\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t<i class=\"beta fa fa-circle-o nudge-half--right float-left\" ng-show=\"event.privacy == 'inviteOnly'\" tooltip=\"Invite Only\" tooltip-placement=\"top\"></i>\n" +
    "\t\t\t\t\t<h3 class=\"flush\">\n" +
    "\t\t\t\t\t\t<a ng-href=\"/event/{{event._id}}\">\n" +
    "\t\t\t\t\t\t\t{{ event.title }}\n" +
    "\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t</h3>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"td two-fifths vertical-align-middle text-right epsilon muted\">\n" +
    "\t\t\t\t\tPosted <span ng-show=\"event.creator\">by </span>\n" +
    "\t\t\t\t\t <a ng-href=\"/profile/{{event.creator.username}}\" class=\"muted\" ng-show=\"event.creator\">{{event.creator.displayName}}</a>\n" +
    "\t\t\t\t\t {{ event.timestamp | timePast }}\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"islet\">\n" +
    "\t\t\t<div class=\"line\">\n" +
    "\t\t\t\t<div class=\"unit full-width last-unit text-center\">\n" +
    "\t\t\t\t\t<span class=\"epsilon\">\n" +
    "\t\t\t\t\t\t<span ng-show=\"event.locationName\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t<i class=\"fa fa-map-marker muted\"></i> <span>{{event.locationName}}<span ng-show=\"event.roomNumber\" ng-bind=\"', Room: ' + event.roomNumber\"></span></span>\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span ng-show=\"event.startDate\" class=\"nudge--right\">\n" +
    "\t\t\t\t\t\t\t<i class=\"fa fa-calendar-o muted\"></i> <span>{{ event.startDate | readableDate }}</span>\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t\t<span ng-show=\"event.startTime\">\n" +
    "\t\t\t\t\t\t\t<i class=\"fa fa-clock-o muted\"></i> <span ng-bind=\"event.startTime\"></span> <span ng-show=\"event.endTime\">- <span ng-bind=\"event.endTime\"></span></span>\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"line soft-half--ends\" ng-show=\"event.description\">\n" +
    "\t\t\t\t<div class=\"unit three-percent\">\n" +
    "\t\t\t\t\t<i class=\"muted epsilon fa fa-align-left\"></i>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"unit last-unit ninety-seven-percent\">\n" +
    "\t\t\t\t\t<p class=\"pre-wrap\" ng-show=\"event.description\" ng-bind-html=\"event.description | urlAndFormat | words:100:event._id\"></p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"event-footer table full-width soft-quarter--ends\">\n" +
    "\t\t\t<div class=\"tr\">\n" +
    "\t\t\t\t<div class=\"td three-fifths vertical-align-middle\">\n" +
    "\t\t\t\t\t<ul class=\"tags\">\n" +
    "\t\t\t\t\t\t<li ng-class=\"{true:'pointer', false:''}[isCurrentPage('/explore')]\" ng-repeat=\"tag in event.tags\" ng-bind=\"tag\" ng-click=\"$parent.$parent.$parent.searchEvents = tag\"></li>\n" +
    "\t\t\t\t\t</ul>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"td two-fifths text-right soft-half--right vertical-align-middle\">\n" +
    "\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\" ng-hide=\"eventPassed(event.startDate)\">\n" +
    "\t\t\t\t\t\t<a class=\"first\" ng-class=\"{green: isAttending(event)}\" href ng-click=\"openAttending(event)\" tooltip=\"People Attending\"><span class=\"gamma\" ng-class=\"{green: isAttending(event)}\">{{ event.attending.length }}</span></a>\n" +
    "\t\t\t\t\t\t<a href ng-click=\"rsvpToEvent(event)\" ng-hide=\"isAttending(event)\"><i class=\"fa fa-thumbs-up\"></i> RSVP</a>\n" +
    "\t\t\t\t\t\t<a href ng-click=\"unRsvpToEvent(event)\" ng-show=\"isAttending(event)\"><i class=\"fa fa-thumbs-o-up\"></i> Un-RSVP</a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"action-buttons nudge-quarter--right\" ng-hide=\"eventPassed(event.startDate)\">\n" +
    "\t\t\t\t\t\t<a href ng-click=\"openShare(event)\" tooltip=\"Share\"><i class=\"fa fa-share-square\"></i></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"action-buttons green\">\n" +
    "\t\t\t\t\t\t<a href ng-href=\"/event/{{event._id}}\">Details <i class=\"fa fa-chevron-right epsilon\"></i></a>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/modal/backdrop.html',
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\" ng-click=\"close($event)\"></div>"
  );


  $templateCache.put('templates/modal/window.html',
    "<div class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10}\" ng-transclude></div>"
  );


  $templateCache.put('templates/pagination/pager.html',
    "<div class=\"pager\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"page in pages\" ng-class=\"{disabled: page.disabled, previous: page.previous, next: page.next}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/pagination/pagination.html',
    "<div class=\"pagination\"><ul>\n" +
    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/popover/popover.html',
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/progressbar/bar.html',
    "<div class=\"bar\" ng-class='type && \"bar-\" + type'></div>"
  );


  $templateCache.put('templates/progressbar/progress.html',
    "<div class=\"progress\"><progressbar ng-repeat=\"bar in bars\" width=\"bar.to\" old=\"bar.from\" animate=\"bar.animate\" type=\"bar.type\"></progressbar></div>"
  );


  $templateCache.put('templates/rating/rating.html',
    "<span ng-mouseleave=\"reset()\">\n" +
    "\t<i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\" ng-class=\"$index < val && (r.stateOn || 'fa-star') || (r.stateOff || 'fa-star-o')\"></i>\n" +
    "</span>"
  );


  $templateCache.put('templates/tabs/tab.html',
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n"
  );


  $templateCache.put('templates/tabs/tabset-titles.html',
    "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n" +
    "</ul>\n"
  );


  $templateCache.put('templates/tabs/tabset.html',
    "\n" +
    "<div class=\"tabbable\" ng-class=\"{'tabs-right': direction == 'right', 'tabs-left': direction == 'left', 'tabs-below': direction == 'below'}\">\n" +
    "  <div tabset-titles=\"tabsAbove\"></div>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div tabset-titles=\"!tabsAbove\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/timepicker/timepicker.html',
    "<table class=\"form-inline\">\n" +
    "\t<tr class=\"text-center\">\n" +
    "\t\t<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><i class=\"fa fa-chevron-up\"></i></a></td>\n" +
    "\t\t<td>&nbsp;</td>\n" +
    "\t\t<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><i class=\"fa fa-chevron-up\"></i></a></td>\n" +
    "\t\t<td ng-show=\"showMeridian\"></td>\n" +
    "\t</tr>\n" +
    "\t<tr>\n" +
    "\t\t<td class=\"control-group\" ng-class=\"{'error': invalidHours}\"><input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"span1 text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\" /></td>\n" +
    "\t\t<td>:</td>\n" +
    "\t\t<td class=\"control-group\" ng-class=\"{'error': invalidMinutes}\"><input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"span1 text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\"></td>\n" +
    "\t\t<td ng-show=\"showMeridian\"><button type=\"button\" ng-click=\"toggleMeridian()\" class=\"btn text-center\">{{meridian}}</button></td>\n" +
    "\t</tr>\n" +
    "\t<tr class=\"text-center\">\n" +
    "\t\t<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><i class=\"fa fa-chevron-down\"></i></a></td>\n" +
    "\t\t<td>&nbsp;</td>\n" +
    "\t\t<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><i class=\"fa fa-chevron-down\"></i></a></td>\n" +
    "\t\t<td ng-show=\"showMeridian\"></td>\n" +
    "\t</tr>\n" +
    "</table>"
  );


  $templateCache.put('templates/tooltip/tooltip-html-unsafe-popup.html',
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/tooltip/tooltip-popup.html',
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/typeahead/typeahead-match.html',
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>"
  );


  $templateCache.put('templates/typeahead/typeahead-popup.html',
    "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\">\n" +
    "        <typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></typeahead-match>\n" +
    "    </li>\n" +
    "</ul>"
  );
}]); });