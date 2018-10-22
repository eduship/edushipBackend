var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var Organisation = require('../../shared/models/organisation');

// using the local strategy with passport
passport.use(
    new Strategy(
        {
            // using custom field names
            usernameField: 'email',
            passwordField: 'pass'
        },
        // login method
        function (email, password, cb) {
            Organisation.findOne({'email': email}, function(err, organisation) {
                if (err) {return cb(err);}
                if(bcrypt.compareSync(password.toString(), organisation.hash)){
                    return cb(null, organisation);
                } else {
                    return cb(null, false);
                }
            });
       }
));

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});
 
passport.deserializeUser(function (id, cb) {
    Organisation.findById(id)
    .exec(function(err, res){
        return cb(null, res);
    });
});

module.exports = passport;