var OrganisationConfirm = require('../../shared/models/organisationConfirm');
var Event = require('../../shared/models/organisation');
var Organisation = require('../../shared/models/organisation');

//get Home if User is logged in
exports.get_home = function(req, res, next){
    if(req.user){
        res.render('home');
    } else {
        res.redirect('/login');
    }
}

//logout user
exports.get_logout = function(req, res, next){
    if(req.user){
        req.logout();
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
}

//get register organisation form
exports.get_register_organisation = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        res.render('register');
    }
}

//create Organisation 
exports.post_register_organisation = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        var conf = new OrganisationConfirm({
            "name" : req.body.name,
            "email" : req.body.email,
            "link" : req.body.link,
            "description": req.body.desc
        });

        conf.save(function(err){
            if(err) return next(err);
        });

        res.redirect('/home');
    }
}

//get create event form
exports.get_create_event = function(req, res, next){
    if(req.user){
        res.render('create');
    } else {
        res.redirect('/login');
    }
}

//create event if user is logged in
exports.post_create_event = function(req, res, next){
    if(req.user){
        var event = new Event({
            name: req.body.name,
            date: req.body.date,
            organisation: req.user.id,
            placeAdress: req.body.adress,
            time: req.body.time,
            description: req.body.description,
            link: req.body.link,
            level: req.body.level,
            costs: req.body.costs,
            age: req.body.age,
            tags: req.body.tags
        
        });
        console.log(event);
        event.save(function(err){
            if(err) return next(err);
        });

        req.user.events.push(event.id);
        Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
            if(err) return next(err);
        });

        res.redirect('/');

    } else {
        res.redirect('/login');
    }
}