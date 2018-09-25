var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var Organisation = require('../../shared/models/organisationLogin');
var bcrypt = require('bcryptjs');

// using the local strategy with passport
passport.use(
    new Strategy(
        {
            // using custom field names
            usernameField: 'user',
            passwordField: 'pass'
        },
        // login method
        function (username, password, cb) {
            Organisation.findOne({name: username}, function(err, organisation){
                if (err) {return cb(null, false); }
                bcrypt.compare(password, organisation.hash, function(err, res){
                    if(res){
                        return cb(null, organisation)
                    } else {
                        return cb(null, false);
                    }
                });
            });
       }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
    cb(null, user);
});

module.exports = passport;