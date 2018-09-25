exports.get_login = function(req, res, next){
    if(req.user){
        return res.redirect('/');
    } else {
        return res.render('login');
    }
};