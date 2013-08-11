Events App
==========

**Registration: A user registers as either an individual or a business.**
- Individuals provide a username, email address, gender(?), and birthday(?). They are given the option of connecting the app to their Facebook and/or twitter, in order to access their friends and liked pages/who they follow.
- Businesses provide a username, email address, location(?), category(?), and are given the option of providing a Facebook page ID and/or a Twitter username (not sure if they should actually have to "connect" their accounts). If they provide these, their posts will be shown not only to those users who subscribe to their category, but also to those users who already follow them on Twitter and/or Facebook. I already looked into the APIs to do this, and I don't think it'll be bad.

**Once registered, individual users select their categories to follow and specify a location.**
- Individual users can choose from a list of categories to "subscribe" to. Every event posted on the site/app must fit into one of these categories in order to show the necessary users. They also choose their location (GPS? Address?) in order to show events only around them.

**Business users can begin posting events after registration.**
- Business users at this point can post events immediately. If they didn't already provide a location and category at sign-up (not sure when to require this), they must provide them when posting their events. Their events will be shown to everyone near the location and following the category, or users already following them on Facebook/Twitter, or if they pay to "broadcast" the event to more people.

**Individual users can now begin seeing events.**
- Events will be split into three views: "My Feed", "All Nearby", and "Calendar". "My Feed" will be those events that both 1. fall under one of the user's subscribed categories, AND 2. are nearby the user's specified location. "All Nearby" shows all events near the user's location, regardless of category. Used more for discovery. "Calendar" would be used to see events further into the future. Should this show all events nearby, or just the ones in the user's categories? Or maybe toggle between the two views?
- When you select an event from either the calendar or feed, you go to an event-specific page. Users can only view public events, and events that they were invited to (if private). This page could have things like a Google Maps map, comments(?), an RSVP count, etc. Even more features could be added later like a voteable playlist or something, but shouldn't be included in our MVP.

**Individual users can also post events.**
- Individual users can post events pretty similarly to how business accounts can. They must specify a location, a category, but unlike businesses, they could have the option of making an event "private" and choosing from a list of their Facebook/Twitter(?) friends people to invite. Only those people would see the event in their feeds and be able to view details about it.