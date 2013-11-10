/**
 * This is where you add new components to the application
 * you don't need to sweat the dependency order (that is what RequireJS is for)
 * but implementations' `define`s placed elsewhere void the warranty
 */
define([
    'controllers/home-ctrl',
    'controllers/inner-ctrl',
    'controllers/login-ctrl',
    'controllers/registerBusiness-ctrl',
    'controllers/registerStudent-ctrl',
    'controllers/activate-ctrl',
    'controllers/resend-ctrl',
    'controllers/forgot-ctrl',
    'controllers/reset-ctrl',
    'controllers/settings-ctrl',
    'controllers/profile-ctrl',
    'controllers/feed-ctrl',
    'controllers/explore-ctrl',
    'controllers/event-ctrl',
    'controllers/post-ctrl',
    'controllers/posted-ctrl',
    'controllers/calendar-ctrl',
    'controllers/contact-ctrl',
    'controllers/modalInstance-ctrl',
    'directives/comment-expand',
    'directives/fixed-sidebar',
    'directives/ng-blur',
    'directives/confirm-password',
    'directives/input-select',
    'directives/time-autocomplete',
    'services/location',
    'services/auth',
    'services/user',
    'services/school',
    'services/event',
    'services/contact',
    'services/invite',
    'filters/parse-url',
    'filters/readable-date',
    'filters/time-past',
    'animations/loading'
], function () {});