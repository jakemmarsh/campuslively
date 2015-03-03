var dotenv         = require('dotenv'),
    express        = require('express'),
    morgan         = require('morgan'),
    compression    = require('compression'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    MongoStore     = require('connect-mongo')(session),
    app            = express(),
    mongoose       = require('mongoose'),
    routes,
    mailer,
    dbString;

dotenv.load();

routes   = require('./api/routes');
mailer   = require('./api/mailer');
dbString = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@oceanic.mongohq.com:10078/'+process.env.DB_NAME;

mongoose.connect(dbString);

mongoose.set('debug', true);

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.send(401, "No session exists for current user.");
  }
}

app.use(morgan('dev'));
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 0);

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connections[0],
        clearInterval: 3600
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: { maxAge: 1800000 } // set cookie's maxAge to only 30 minutes until user logs in
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
app.put('/api/v1/auth/register', routes.auth.register);
app.get('/api/v1/auth/username/:username', routes.auth.checkUsername);
app.get('/api/v1/auth/email/:email', routes.auth.checkEmail);
app.get('/api/v1/auth/user/:username/resend', routes.auth.resendActivation);
app.get('/api/v1/auth/checkKey/:resetKey', routes.auth.checkResetKey);
app.post('/api/v1/auth/user/:userId/activate/:activateKey', routes.auth.activate);
app.post('/api/v1/auth/forgot', routes.auth.forgotPassword);
app.post('/api/v1/auth/reset', routes.auth.resetPassword);

// contact form
app.post('/api/v1/contact', mailer.sendContactEmail);

// users
app.get('/api/v1/user', restrict, routes.user.getAllUsers);
app.get('/api/v1/user/:userId/subscribers', restrict, routes.user.getSubscribers);
app.get('/api/v1/user/:userId/inviteTo/event/:eventId', restrict, routes.user.getUsersForInvite);

// search parameters are passed as ?query=X
app.get('/api/v1/user/search', restrict, routes.user.searchForUsers);

app.get('/api/v1/user/:userId', restrict, routes.user.getUser);
app.get('/api/v1/user/username/:username', restrict, routes.user.getUserByName);
app.patch('/api/v1/user/:userId', routes.user.updateUser);
app.post('/api/v1/user/:userId/image', routes.user.uploadImage);
app.post('/api/v1/user/:userId/subscribe/:subscribeId', restrict, routes.user.subscribe);
app.post('/api/v1/user/:userId/unsubscribe/:subscribeId', restrict, routes.user.unsubscribe);

app.post('/api/v1/user/:userId/addFacebookSubscriptions', restrict, routes.user.addFacebookSubscriptions);

app.delete('/api/v1/user/:userId', restrict, routes.user.deleteUser);

app.get('/api/v1/user/:userId/activities', restrict, routes.user.getActivities);
app.get('/api/v1/user/:userId/activities/limit/:limit', restrict, routes.user.getActivities);
app.get('/api/v1/user/:userId/activities/newer/:newestId?', restrict, routes.user.getActivitiesNewer);
app.get('/api/v1/user/:userId/activities/older/:oldestId/limit/:limit', restrict, routes.user.getActivitiesOlder);

// schools
app.get('/api/v1/school/all', routes.school.getAllSchools);

// events
app.get('/api/v1/event/count', routes.event.getCount);

app.get('/api/v1/event', restrict, routes.event.getAllEvents);
app.get('/api/v1/event/:eventId', restrict, routes.event.getEvent);

app.get('/api/v1/event/school/:schoolId/limit/:limit', restrict, routes.event.getEventsBySchool);
app.get('/api/v1/event/school/:schoolId', restrict, routes.event.getEventsBySchool);
app.get('/api/v1/event/school/:schoolId/newer/:newestId?', restrict, routes.event.getEventsBySchoolNewer);
app.get('/api/v1/event/school/:schoolId/older/:oldestId/limit/:limit', restrict, routes.event.getEventsBySchoolOlder);

app.get('/api/v1/event/school/:schoolId/day/:date', restrict, routes.event.getEventsBySchoolAndDay);
app.get('/api/v1/event/near/:lat/:lng/day/:date', restrict, routes.event.getEventsByLocationAndDay);

app.get('/api/v1/event/profile/:profileId/limit/:limit', restrict, routes.event.getEventsByUser);
app.get('/api/v1/event/profile/:profileId', restrict, routes.event.getEventsByUser);
app.get('/api/v1/event/profile/:profileId/newer/:newestId?', restrict, routes.event.getEventsByUserNewer);
app.get('/api/v1/event/profile/:profileId/older/:oldestId/limit/:limit', restrict, routes.event.getEventsByUserOlder);

app.get('/api/v1/event/near/:lat/:lng/limit/:limit', restrict, routes.event.getEventsByLocation);
app.get('/api/v1/event/near/:lat/:lng', restrict, routes.event.getEventsByLocation);
app.get('/api/v1/event/near/:lat/:lng/newer/:newestId?', restrict, routes.event.getEventsByLocationNewer);
app.get('/api/v1/event/near/:lat/:lng/older/:oldestId/limit/:limit', restrict, routes.event.getEventsByLocationOlder);

app.put('/api/v1/event', restrict, routes.event.postEvent);
app.post('/api/v1/event/:eventId/image', restrict, routes.event.uploadImage);
app.patch('/api/v1/event/:eventId', restrict, routes.event.updateEvent);
app.post('/api/v1/event/:eventId/invite/sender/:senderId', restrict, routes.event.inviteUsers);
app.post('/api/v1/event/:eventId/rsvp/:userId', restrict, routes.event.rsvp);
app.delete('/api/v1/event/:eventId/unrsvp/:userId', restrict, routes.event.unRsvp);
app.post('/api/v1/event/:eventId/googleEventId/add/:googleEventId/username/:username', restrict, routes.event.addGoogleEventId);
app.delete('/api/v1/event/:eventId/googleEventId/remove/username/:username', restrict, routes.event.removeGoogleEventId);

app.delete('/api/v1/event/:eventId', restrict, routes.event.deleteEvent);

// comments
app.get('/api/v1/comment/:commentId', restrict, routes.comment.getComment);

app.post('/api/v1/event/:eventId/comment', restrict, routes.comment.postComment);
app.post('/api/v1/event/:eventId/comment/:commentId/subcomment', restrict, routes.comment.postSubComment);
app.post('/api/v1/event/comment/:commentId/like/:userId', restrict, routes.comment.likeComment);
app.delete('/api/v1/event/comment/:commentId/unlike/:userId', restrict, routes.comment.unlikeComment);

app.delete('/api/v1/event/:eventId/comment/:commentId', restrict, routes.comment.deleteComment);
app.delete('/api/v1/event/:eventId/comment/:commentId/subComment/:subCommentId', restrict, routes.comment.deleteSubComment);

// invites
app.get('/api/v1/invite/user/:userId', restrict, routes.invite.getUnreadInvites);
app.post('/api/v1/invite/:inviteId/read', restrict, routes.invite.markInviteAsRead);

// venues
app.get('/api/v1/venues/:schoolId', restrict, routes.venue.getVenuesBySchool);

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/app" });
});

// handle errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

// start server
app.listen(process.env.PORT || 3000);