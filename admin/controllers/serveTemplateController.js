exports.get_dashboard = function(req, res, next){
    if (req.user){
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
}

exports.get_login = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        res.render('login');
    }
}