var passport = require('passport');
var passport_http = require('passport-http');
var BasicStrategy = passport_http.BasicStrategy;

//create user 
var user = {
    username : 'db_user',
    password : 'b35q9IykCZny72BshCpc'
};

//set strategy
passport.use(new BasicStrategy(
    function(username, password, done){
        if(username === user.username && password === user.password) {
            return done(null, user);
        }
        else {
            done(null, false, { message: 'Invalid username or password'});
        }
    }
));

module.exports = passport;