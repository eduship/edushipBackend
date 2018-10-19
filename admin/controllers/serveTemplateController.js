os = require('os-utils');

exports.get_dashboard = function(req, res, next){
    if (req.user){
        os.cpuUsage(function(v){
            console.log(Math.round(os.freememPercentage()*100))
            res.render('dashboard', {
                freemem : Math.round(os.freememPercentage()*100),
                usedcpu : Math.round(v*100),
                processUptime : os.processUptime()
            });
        });
    } else {
        res.redirect('/login');
    }
}

//if req.user render admin page else return to login
exports.get_login = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        res.render('login');
    }
}