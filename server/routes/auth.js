var Q      = require('q'),
    crypto = require('crypto'),
    User   = require('../models/user');

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */
function hash(pwd, salt, fn) {
    // Bytesize
    var len = 128,

    // Iterations. ~300ms
        iterations = 12000;

    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
}

var users = {
    tj: {name: 'tj'}
};

// when you create a user, generate a salt
// and hash the password
hash('foobar', function(err, salt, hash){
    if (err) throw err;
    // store the salt & hash in the "db"
    users.tj.salt = salt;
    users.tj.hash = hash;
});

function authenticate(name, pass, fn) {
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function(err, hash){
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
    });
}

exports.check = function(req, res) {
    if (req.session.user) {
        res.send(200, "User is logged in.");
    } 
    else {
        res.send(401, "No session exists for user.");
    }
}

exports.login = function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user){
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation 
            req.session.regenerate(function(){
                // Store the user's primary key 
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
            });
            // respond with user object
            res.json(user);
        } 
        else {
            res.send(401, "User does not exist.");
        }
    });
};

exports.logout = function(req, res) {
	var username = req.body.username,
        password = req.body.password;

    req.session.destroy();
    res.send(200, "User successfully logged out.");
};

exports.register = function(req, res) {
    var newUser;

    // generate a salt and hash the password
    hash(req.body.password, function(err, salt, hash){
        if (err) throw err;

        // create user object from traits that are shared between student and business accounts
        newUser = new User({
            username: req.body.username,
            salt: salt,
            hash: hash,
            email: req.body.email
        });

        // check for account type
        if(req.body.type) {
            if(req.body.type.toLowerCase() == 'student') {
                if((newUser.email.substring(newUser.email.length - 4)).toLowerCase() != '.edu') {
                    res.send(400, 'Email address must end in .edu.');
                }

                newUser.type = 'student';
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.gender = req.body.gender;
                newUser.school = req.body.school;
            }
            else if(req.body.type.toLowerCase() == 'business') {
                newUser.type = 'business';
                newUser.businessName = req.body.businessName;

                // assign business to a school if one is specified
                if(req.body.school) {
                    newUser.school = req.body.school;
                }
            }
        }

        // TODO: store user
    });
};