var auth = require('../auth/admin_auth');

exports.serve_login = function(req, res, next){
    if(req.user){
        res.redirect('/welcome');
    } else {
        res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="user"/><br/></div><div><label>Password:</label><input type="password" name="pass"/></div><div><input type="submit" value="Submit"/></div></form>');
    }
};

exports.serve_welcome = function(req, res, next){
    if(req.user){
        res.send('Welcome: ' + req.user.username);
    } else {
        return res.redirect('/login');
    }
    
};

exports.serve_test2 = function(req, res, next){
    if(req.user){
        res.send('Authenticated');
    } else {
        return res.redirect('/login');
    }
};

