var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');
var confirmOrganisation = require('../../shared/models/organisationConfirm');

//Create Organisation on post if user is Admin
exports.post_create_organisation = function(req, res, next){
    if(req.user.isAdmin){
        var org = new Organisation(req.body);
        org.save(function(err){
            if(err) return next(err);
        });
        res.json(org);
    } else {
        res.send({ "error" : "missing credentials"});
    }
}

//Update organisation by Id
exports.update_organisation_by_id = function(req, res, next){
    if(req.user.id == req.params.id){
        var newOrg = new Organisation(req.body);
        Organisation.findByIdAndUpdate(req.params.id, newOrg, function(err){
            if (err) return next(next);
        });
        res.json(newOrg);
    } else {
        res.send({ "error" : "missing credentials"});
    }
}

//Delte Organisation by Id
exports.delte_organisation_by_id = function(req, res, next){
    if(req.user.isAdmin){
        Organisation.findByIdAndDelete(req.params.id, function(err){
            if (err) return next(err);
        });
        res.send({"message" : "sucess"});
    } else {
        res.send({ "error" : "missing credentials"});
    }
}

//Create Event on post if user is logged in
exports.post_create_event = function(req, res, next){
    if(req.user){

        var ev = new Event(req.body);
        ev.save(function(err){
            if(err) return next(err);
        });

        req.user.events.push(ev.id);
        Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
            if (err) return next(err);
        });

        res.send(res.json(ev));
    } else {
        res.send({ "error" : "missing credentials"});
    }
}

//Update Event
exports.update_event_by_id = function(req, res, next){
    if(req.user.id == req.body.organisation){
        var newEv = new Event(req.body);
        newEv.save(function(err){
            if (err) return next(err);
        });
        res.json(newEv);
    } else {
        res.send({"error" : "missing credentials"});
    }
}

//Delete Event
exports.delte_event_by_id = function(req, res, next){
    var index = req.user.events.indexOf(req.params.id); 
    if(index >= 0){

        Event.findByIdAndDelete(req.params.id, function(err){
            if(err) return next(err);
        });

        req.user.events.splice(index, index+1);
        Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
            if(err) return next(err);
        });

        res.send({"message" : "sucess"});

    } else {
        res.send({"error" : "missing credentials" })
    }
}

//Create confirmOrganisation on post 
exports.post_create_confirmOrganisation = function(req, res, next){
    var confOrg = new confirmOrganisation(req.body);
    confOrg.save(function(err){
        if(err) return next(err);
    });
    res.json(confOrg);
}

//Delete confirmOrganisation
exports.delte_confirmOrganisation_by_id = function(req, res, next){
    if(req.user.isAdmin){
        confirmOrganisation.findByIdAndDelete(req.params.id, function(err){
            if(err) next(err);
        });
        res.send({"message" : "sucess"});
    } else {
        res.send({"error" : "missing credentials"});
    }
}