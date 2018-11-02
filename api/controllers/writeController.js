var bcrypt = require('bcryptjs');
var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');
var confirmOrganisation = require('../../shared/models/organisationConfirm');

const saltRounds = 10;

//Create Organisation on post if user is Admin
exports.post_create_organisation_by_confOrg_id = function(req, res, next){
    confirmOrganisation.findById(req.params.id, function(err, confOrg){
        if(err) return next(err);
        var org = new Organisation({
            "name" : confOrg.name,
            "hash" : confOrg.hash,
            "email" : confOrg.email,
            "isAdmin" : req.body.isAdmin
        });
        org.save(function(err){
            if(err) return next(err);
        });
        res.json(org);
    });
}

//Update organisation by Id
exports.update_organisation = function(req, res, next){
    if(req.user.isAdmin == false){req.body.isAdmin = false} else{req.body.isAdmin = true} ;
    Organisation.findByIdAndUpdate(req.user.id, req.body, {new: true}, function(err, no){
        if (err) return next(err);
        res.json(no);
    });
}

//Delete Organisation by Id
exports.delete_organisation_by_id = function(req, res, next){
    Organisation.findByIdAndDelete(req.params.id, function(err){
        if(err) return next(err);
    });
    res.send({"message" : "sucess"});
}

//Create Event on post if user is logged in
exports.post_create_event = function(req, res, next){
    try{
        req.body.organisationID = req.user.id;
        req.body.organisation = req.user.name;

        var ev = new Event(req.body);
        ev.save(function(err){
            if(err) return next(err);
        });

        req.user.events.push(ev.id);
        Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
            if (err) return next(err);
        });

        res.send(res.json(ev));
    } catch (TypeError){}
}

//Update Event
exports.update_event_by_id = function(req, res, next){
    Event.findById(req.params.id, function(err, event){
        if(err) return next(err);

        if(event.organisationID == req.user.id){
            Event.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, newEv){
                if(err) return next(err);
                res.send(newEv)
            })
        } else {
            res.status(400).json({
                'message': 'access denied'
            });
        }
    });
    
}

//Delete Event
exports.delete_event_by_id = function(req, res, next){
    var index = req.user.events.indexOf(req.params.id);

    Event.findById(req.params.id, function(err, ev){
        if(err) return next(err);
        var id = ev.organisationID;


        //check if event is in user.events and ev.organisationID equals user id
        if(index >= 0 && req.user.id == id){

            console.log("test")

            Event.findByIdAndDelete(req.params.id, function(err){
                if(err) return next(err);
            });

            req.user.events.splice(index, index+1);
            Organisation.findByIdAndUpdate(req.user.id, req.user, function(err){
                if(err) return next(err);
            });

            res.send({"message" : "sucess"});

        } else {
            res.status(400).json({
                'message': 'access denied'
            });
        }
    });


}

//Create confirmOrganisation on post 
exports.post_create_confirmOrganisation = function(req, res, next){
    req.body.hash = bcrypt.hashSync(req.body.password, saltRounds);
    var confOrg = new confirmOrganisation(req.body);
    confOrg.save(function(err){
        if(err) return next(err);
    });
    res.json(confOrg);
}

//Delete confirmOrganisation by id
exports.delete_confirmOrganisation_by_id = function(req, res, next){
    confirmOrganisation.findByIdAndDelete(req.params.id, function(err){
        if(err) next(err);
    });
    res.send({"message" : "sucess"});
}