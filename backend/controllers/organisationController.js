var OrganisationConfirm = require('../../shared/models/organisationConfirm');
var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');

//get Home if User is logged in
exports.get_home = function(req, res, next){
    if(req.user){
        res.render('home', {events: req.user.events});
        console.log(req.user);
    } else {
        res.redirect('/login');
    }
};

//logout user
exports.get_logout = function(req, res, next){
    if(req.user){
        req.logout();
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
};

//get register organisation form
exports.get_register_organisation = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        res.render('register');
    }
};

//create Organisation 
exports.post_register_organisation = function(req, res, next){
    if(req.user){
        res.redirect('/');
    } else {
        //create OrganisationConfirm Object
        var conf = new OrganisationConfirm(req.body);

        //save OC Object
        conf.save(function(err){
            if(err) return next(err);
        });

        res.redirect('/login');
    }
};

//get create event form
exports.get_create_event = function(req, res, next){
    if(req.user){
        res.render('create');
    } else {
        res.redirect('/login');
    }
};

//create event if user is logged in
exports.post_create_event = function(req, res, next){
    if (req.user){
        //set organisation param 
        req.body.organisation = req.user.id;
        console.log(req.body);
        //create Event Object
        var ev = new Event(req.body);

        console.log(ev);

        //save Event Object
        ev.save(function(err){
            if (err) return next(err);
        });

        //push events array an Update in database
        req.user.events.push(ev.id);
        Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
            if (err) return next(err);
        });

        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};


//get update form if req.user and user has the persmission to edit this event
exports.get_update_event = function(req, res, next){
    if(req.user){
        //check if id is in req.user.events
        if (req.user.events.indexOf(req.params.id) >= 0){
        //find event to render data in template
        Event.findById(req.params.id, function(err, ev){
            if(err) return next(err);
            console.log(ev);
            res.render('update', {event: ev});
        });
        //redirect if event does not belong to user
        } else {
            return res.redirect('/');
        }
    //redirect if user is not authenticated
    } else {
        res.redirect('/login');
    }
};

//post event update form
exports.post_update_event = function(req, res, next){
    if(req.user){
        //check if event is in req.user.events
        if (req.user.events.indexOf(req.params.id) >= 0){
            //update event
            Event.findByIdAndUpdate(req.params.id, req.body, function(err){
                if (err) return next(err);
            });
        }

        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};

//get delete event
exports.get_delete_event = function(req, res, next){
    if(req.user){

        var i = req.user.events.indexOf(req.params.id);

        if (i >= 0){
            //Remove element from event.user.events
            req.user.events.splice(i, i+1);

            //Update Organisation
            Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
                if (err) return next(err);
            });

            //Delete Event
            console.log(Event);

            Event.findByIdAndDelete(req.params.id, function(err){
                if (err) return next(err);
            });
        }

        res.redirect('/');

    } else {
        res.redirect('/login');
    }
};