var path     = require('path'),
    express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    routes   = require(path.join(__dirname, 'routes'));

var dbusr = 'jakemmarsh',
    dbpw  = 'kenneth5030',
    db    = 'app16713328';


mongoose.connect('mongodb://'+dbusr+':'+dbpw+'@dharma.mongohq.com:10004/'+db);

mongoose.set('debug', true);


app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.bodyParser());

    // serve all asset files from necessary directories
    app.use("/js", express.static(__dirname + "/../app/js"));
    app.use("/img", express.static(__dirname + "/../app/img"));
    app.use("/css", express.static(__dirname + "/../app/css"));
    app.use("/partials", express.static(__dirname + "/../app/partials"));

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
