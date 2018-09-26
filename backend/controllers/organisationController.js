exports.get_home = function(req, res, next){
    if(req.user){
        res.send('Test Sucess');
    } else {
        res.redirect('/login');
    }
}