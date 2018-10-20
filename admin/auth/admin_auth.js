var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const saltRounds = 10;

//create user 
var user = {
    id : 0,
    username : 'admin',
    password : '$2y$10$WYJGo8QaiJOC1oEVwb5oae7D1rjZN/EDy0t5SWxjsCOZCrzjUZRve' //b35q9IykCZny72BshCpc
};

// using the local strategy with passport
passport.use(
    new Strategy(
        {
            // using custom field names
            usernameField: 'user',
            passwordField: 'pass',
            passReqToCallback: true
        },
        // login method
        function (req ,username, password, cb) {
            if (username === user.username && bcrypt.compareSync(password.toString(), user.password)) {
                return cb(null, user);
 
            } else {
                return cb(null, false);
            }
       }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
    cb(null, user);
});

module.exports = passport;