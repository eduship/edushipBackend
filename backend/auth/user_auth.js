var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var Organisation = require('../../shared/models/organisationLogin');
const saltRounds = 10;

// using the local strategy with passport
passport.use(
    new Strategy(
        {
            // using custom field names
            usernameField: 'email',
            passwordField: 'pass'
        },
        // login method
        function (username, password, cb) {
            console.log("auth");
            Organisation.findOne({'email': username}, function(err, organisation) {
                console.log(err, organisation);
                if (err) {return cb(err);}
                if(bcrypt.compareSync(password.toString(), organisation.hash)){
                    console.log("b");
                    return cb(null, organisation);
                } else {
                    console.log("f");
                    return cb(null, false);
                }
            });
       }
));

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});
 
passport.deserializeUser(function (id, cb) {
    Organisation.findById(id, function(err, user){
        cb(null, user);
    });
});

module.exports = passport;