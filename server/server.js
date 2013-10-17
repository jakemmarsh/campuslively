var path       = require('path'),
    express    = require('express'),
    MongoStore = require('connect-mongo')(express)
    app        = express(),
    mongoose   = require('mongoose'),
    routes     = require(path.join(__dirname, 'routes')),
    config     = require('./config');

mongoose.connect(config.db.dbString);

mongoose.set('debug', true);

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } 
  else {
    res.send(401, "No session exists for current user.");
  }
}

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.bodyParser());

    app.use(express.cookieParser());
    app.use(express.session({
        store: new MongoStore({
            mongoose_connection: mongoose.connections[0],
            clear_interval: 3600
        }),
        secret: config.secret,
        // set cookie's maxAge to only 30 minutes until user logs in
        cookie: {
            maxAge: 1800000
        }
    }));

    // serve all asset files from necessary directories
    app.use("/js", express.static(__dirname + "/../app/js"));
    app.use("/img", express.static(__dirname + "/../app/img"));
    app.use("/css", express.static(__dirname + "/../app/css"));
    app.use("/partials", express.static(__dirname + "/../app/partials"));
    app.use("/templates", express.static(__dirname + "/../app/templates"));

    // auth
    app.get('/api/v1/auth/check', routes.auth.check);
    app.post('/api/v1/auth/login', routes.auth.login);
    app.post('/api/v1/auth/logout', routes.auth.logout);
    app.post('/api/v1/auth/register', routes.auth.register);
    app.get('/api/v1/auth/username/:username', routes.auth.checkUsername);
    app.get('/api/v1/auth/user/:username/resend', routes.auth.resendActivation);
    app.post('/api/v1/auth/user/:userId/activate/:activateKey', routes.auth.activate);
    app.post('/api/v1/auth/forgot', routes.auth.forgotPassword);
    app.post('/api/v1/auth/reset', routes.auth.resetPassword);
    app.get('/api/v1/auth/signS3/:fileName', restrict, routes.auth.S3Signing);

    // users
    app.get('/api/v1/user/:userId', restrict, routes.user.getUser);
    app.get('/api/v1/user/username/:username', restrict, routes.user.getUserByName);
    app.patch('/api/v1/user/:userId', routes.user.updateUser);
    app.post('/api/v1/user/:userId/subscribe/:subscribeId', restrict, routes.user.subscribe);
    app.post('/api/v1/user/:userId/unsubscribe/:subscribeId', restrict, routes.user.unsubscribe);
    
    app.get('/api/v1/user/:userId/activities', restrict, routes.user.getActivities);
    app.get('/api/v1/user/:userId/activities/limit/:limit', restrict, routes.user.getActivities);
    app.get('/api/v1/user/:userId/activities/skip/:skip/limit/:limit', restrict, routes.user.getActivitiesOlder);

    // schools
    app.get('/api/v1/school/all', routes.school.getAllSchools);

    // events
    app.get('/api/v1/event/:eventId', restrict, routes.event.getEvent);

    app.get('/api/v1/event/school/:schoolId/limit/:limit', restrict, routes.event.getEventsBySchool);
    app.get('/api/v1/event/school/:schoolId', restrict, routes.event.getEventsBySchool);
    app.get('/api/v1/event/school/:schoolId/skip/:skip/limit/:limit', restrict, routes.event.getEventsBySchoolOlder);

    app.get('/api/v1/event/school/:schoolId/day/:date', restrict, routes.event.getEventsBySchoolAndDay);

    app.get('/api/v1/event/user/:userId/limit/:limit', restrict, routes.event.getEventsByUser);
    app.get('/api/v1/event/user/:userId', restrict, routes.event.getEventsByUser);
    app.get('/api/v1/event/user/:userId/skip/:skip/limit/:limit', restrict, routes.event.getEventsByUserOlder);

    app.get('/api/v1/event/near/:lat/:lng/limit/:limit', restrict, routes.event.getEventsByLocation);
    app.get('/api/v1/event/near/:lat/:lng', restrict, routes.event.getEventsByLocation);
    app.get('/api/v1/event/near/:lat/:lng/skip/:skip/limit/:limit', restrict, routes.event.getEventsByLocationOlder);

    app.post('/api/v1/event', restrict, routes.event.postEvent);
    app.post('/api/v1/event/:eventId/rsvp/:userId', restrict, routes.event.rsvp);
    app.post('/api/v1/event/:eventId/unrsvp/:userId', restrict, routes.event.unRsvp);

    app.delete('/api/v1/event/:eventId', restrict, routes.event.deleteEvent);

    // comments
    app.get('api/v1/comment/:commentId', restrict, routes.comment.getComment);

    app.post('/api/v1/event/:eventId/comment', restrict, routes.comment.postComment);
    app.post('/api/v1/event/:eventId/comment/:commentId/subcomment', restrict, routes.comment.postSubComment);
    app.post('/api/v1/event/comment/:commentId/like/:userId', restrict, routes.comment.likeComment);
    app.post('/api/v1/event/comment/:commentId/unlike/:userId', restrict, routes.comment.unlikeComment);

    app.delete('/api/v1/event/:eventId/comment/:commentId', restrict, routes.comment.deleteComment);
    app.delete('/api/v1/event/:eventId/comment/:commentId/subComment/:subCommentId', restrict, routes.comment.deleteSubComment);

    // serve index.html for all remaining routes, in order to leave routing up to angular
    app.all("/*", function(req, res, next) {
        res.sendfile("index.html", { root: __dirname + "/../app" });
    });
    app.use(express.errorHandler({
        dumpExceptions: true, 
        showStack: true
    }));
});

app.listen(process.env.PORT || 3000);
