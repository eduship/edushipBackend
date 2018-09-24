var passport = require('passport')
var Strategy = require('passport-local').Strategy;

//create user 
var user = {
    id : 0,
    username : 'admin',
    password : 'test' //b35q9IykCZny72BshCpc
};

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
            if (username === user.username && password.toString() === user.password) {
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