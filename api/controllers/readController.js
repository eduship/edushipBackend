var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');
var confirmOrganisation = require('../../shared/models/organisationConfirm');

/*** Event Controller ***/

//List of all events
exports.get_event_list = function(req, res, next){
    Event.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
    });
};

//Find Event by ID
exports.get_event_by_id = function(req, res, next) {
    Event.findById(req.params.id, function (err, event) {
      if (err) return next(err);
      res.json(event);
    });
};

/*** Organisation Controller ***/

//List of all Organisations
exports.get_organisation_list = function(req, res, next){
    Organisation.find({isAdmin: false})
    .select('-hash')    //exclude hash from output
    .select('-isAdmin')
    .exec(function(err, organisations){
        if(err) return next(err); 
        res.json(organisations);
    });
};

//Find Organisation by ID
exports.get_organisation_by_id = function(req, res, next){
    Organisation.find({_id: req.params.id, isAdmin: false})
    .select('-hash')                    //exclude hash from output
    .select('-isAdmin')
    .exec(function(err, organisation){
        if(err) return next(err);
        res.json(organisation);
    });
};

//Find Events by Organisation ID
exports.get_organisation_events = function(req, res, next){
    Organisation.findById(req.params.id)
    .populate('events')                 //populate events array
    .exec(function(err, organisation){
        if(err) return next(err);
        res.json(organisation.events); //return events as json array
    });
}

/*** Confirm Organisations ***/

//List of all confirmOrganisations
exports.get_confirmOrganisation_list = function(req, res, next){
    confirmOrganisation.find(function(err, corgs){
        if(err) return next(err);
        res.json(corgs);
    });
}

//Find confirmOrganisation by ID
exports.get_confirmOrganisation_by_id = function(req, res, next){
    confirmOrganisation.findById(req.params.id, function(err, corg){
        if(err) return next(err);
            res.json(corg);
    });
}
