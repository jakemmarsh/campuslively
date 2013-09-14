/**
 * This is where you add new components to the application
 * you don't need to sweat the dependency order (that is what RequireJS is for)
 * but implementations' `define`s placed elsewhere void the warranty
 */
define([
    'controllers/login-ctrl',
    'controllers/register-ctrl',
    'controllers/forgot-ctrl',
    'controllers/settings-ctrl',
    'controllers/profile-ctrl',
    'controllers/feed-ctrl',
    'controllers/events-ctrl',
    'controllers/event-ctrl',
    'controllers/post-ctrl',
    'controllers/calendar-ctrl',
    'controllers/contact-ctrl',
    'controllers/modalInstance-ctrl'
], function () {});